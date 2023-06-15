import { Page } from 'puppeteer';
import type { Influencer } from '../types/influencer';
import { Config } from '../utils/config';
import { waitForTimeout } from '../utils/waitForTimeout';
import { AbstractCrawler } from './abstract.crawler';

export class InstagramCrawler extends AbstractCrawler {
  async crawl(): Promise<Influencer | null> {
    console.info(`Starting to crawl ${this._profileUrl}`);
    const page = await this._browser.newPage();

    await this.login(page);
    await waitForTimeout(5000);
    await page.goto(this._profileUrl);
    // wait for 2 secs to make sure the page is loaded
    await waitForTimeout(2000);
    // const element = await page.waitForSelector('ul > li.x2pgyrj');
    const postCount = await page.$eval(
      'ul > li.x2pgyrj:nth-child(1) > span > span',
      (el) => el.textContent,
    );
    const followers = await page.$eval(
      'ul > li.x2pgyrj:nth-child(2) > a > span > span',
      (el) => el.textContent,
    );

    const following = await page.$eval(
      'ul > li.x2pgyrj:nth-child(3) > a > span > span',
      (el) => el.textContent,
    );

    // await page.screenshot({ path: 'screen-capture-test.png' });
    console.log({ postCount, followers, following });

    page.close();

    // let sharedData = await page.evaluate(() => {
    //   return window._sharedData.entry_data.ProfilePage[0].graphql.user;
    // });

    return null;
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
}
