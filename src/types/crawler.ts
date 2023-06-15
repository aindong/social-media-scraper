import { Influencer } from './influencer';

export interface Crawler {
  crawl(): Promise<Influencer | null>;
}
