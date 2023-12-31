import type { Browser, Page } from 'puppeteer';
import type { Influencer } from '../types/influencer';
import type { Crawler } from '../types/crawler';

export class AbstractCrawler implements Crawler {
  protected _browser: Browser;
  protected _profileUrl: string;
  protected _influencer: Influencer | null = null;

  constructor(browser: Browser, profileUrl: string) {
    this._browser = browser;
    this._profileUrl = profileUrl;
  }

  async login(page: Page): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getInfluencer(page: Page): Promise<Influencer | null> {
    throw new Error('Method not implemented.');
  }

  async crawl(): Promise<Influencer | null> {
    console.info(`Starting to crawl ${this._profileUrl}`);
    return this._influencer;
  }
}
