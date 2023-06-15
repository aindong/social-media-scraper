import { Page } from 'puppeteer';
import { Influencer } from './influencer';

export interface Crawler {
  crawl(): Promise<Influencer | null>;
  login(page: Page): Promise<void>;
  getInfluencer(page: Page): Promise<Influencer | null>;
}
