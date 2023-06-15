import { Page } from 'puppeteer';
import type { Influencer } from '../types/influencer';
import { TiktokUserResponse } from '../types/tiktok';
import { waitForTimeout } from '../utils/waitForTimeout';
import { AbstractCrawler } from './abstract.crawler';

export class TiktokCrawler extends AbstractCrawler {
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

    const influencer = await this.getInfluencer(page);
    await waitForTimeout(2000);

    page.close();

    return influencer;
  }

  async getInfluencer(page: Page): Promise<Influencer | null> {
    const influencerPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        // Reject the promise if no response is received within the timeout period
        reject(null);
      }, 5000);

      page.on('response', (response) => {
        // Access response details
        const url = response.url();

        if (url.includes('/api/user/detail/')) {
          clearTimeout(timeout);

          // Do something with the response
          response.text().then((body) => {
            const response: TiktokUserResponse = JSON.parse(body);

            const { userInfo } = response;
            const influencer: Influencer = {
              id: userInfo.user.id,
              username: userInfo.user.uniqueId,
              fullName: userInfo.user.nickname,
              profilePicUrl: userInfo.user.avatarLarger,
              bio: userInfo.user.signature,
              platform: 'tiktok',
              externalUrl: userInfo.user.bioLink.link,
              followerCount: userInfo.stats.followerCount,
              followingCount: userInfo.stats.followingCount,
              isPrivate: userInfo.user.privateAccount,
              isVerified: userInfo.user.verified,
              engagementRate:
                (userInfo.stats.heartCount / userInfo.stats.followerCount) *
                100,
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
