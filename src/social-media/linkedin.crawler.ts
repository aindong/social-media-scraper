import { Influencer } from '../types/influencer';
import { AbstractCrawler } from './abstract.crawler';

export class LinkedinCrawler extends AbstractCrawler {
  async crawl(): Promise<Influencer | null> {
    return null;
  }
}
