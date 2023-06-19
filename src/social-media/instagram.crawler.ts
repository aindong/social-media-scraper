import { Page } from 'puppeteer';
import type { Influencer } from '../types/influencer';
import { Config } from '../utils/config';
import { waitForTimeout } from '../utils/waitForTimeout';
import { AbstractCrawler } from './abstract.crawler';
import type { InstagramProfileResponse } from '../types/instagram';

export class InstagramCrawler extends AbstractCrawler {
  async crawl(): Promise<Influencer | null> {
    console.info(`Starting to crawl ${this._profileUrl}`);
    const page = await this._browser.newPage();

    // Enable request interception
    await page.setRequestInterception(true);
    // Listen for network request events
    page.on('request', (request) => {
      // Continue all requests
      request.continue();
    });

    await this.login(page);
    await waitForTimeout(5000);

    const influencer = await this.getInfluencer(page);
    // wait for 2 secs to make sure the page is loaded
    await waitForTimeout(2000);
    page.close();

    return influencer;
  }

  async login(page: Page) {
    // login to instagram
    await page.goto('https://www.instagram.com/accounts/login/');
    await waitForTimeout(2000);
    await page.type('input[name="username"]', Config.get('INSTAGRAM_USERNAME'));
    await page.type('input[name="password"]', Config.get('INSTAGRAM_PASSWORD'));
    // click on the login button
    await page.click('button[type="submit"]');
  }

  async getInfluencer(page: Page): Promise<Influencer | null> {
    const influencerPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        // Reject the promise if no response is received within the timeout period
        reject(null);
      }, 5000);

      page.on('response', (response) => {
        const url = response.url();

        if (url.includes('api/v1/users/web_profile_info')) {
          clearTimeout(timeout);

          // Do something with the response
          response.text().then((body) => {
            const response: InstagramProfileResponse = JSON.parse(body);

            const { data } = response;
            const influencer: Influencer = {
              id: data.user.id,
              username: data.user.username,
              fullName: data.user.full_name,
              profilePicUrl: data.user.profile_pic_url,
              bio: data.user.biography,
              platform: 'instagram',
              externalUrl: data.user.external_url,
              followerCount: data.user.edge_followed_by.count,
              followingCount: data.user.edge_follow.count,
              isPrivate: data.user.is_private,
              isVerified: data.user.is_verified,
              engagementRate: 0,
            };

            resolve(influencer);
          });
        }
      });
    });

    await page.goto(this._profileUrl);

    try {
      const influencer = await Promise.race([
        influencerPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 10000),
        ),
      ]);

      return influencer as Influencer;
    } catch (error) {
      return null;
    }
  }
}
