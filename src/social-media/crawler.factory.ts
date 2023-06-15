import { Browser } from 'puppeteer';
import type { Crawler } from '../types/crawler';
import { InstagramCrawler } from './instagram.crawler';
import { TiktokCrawler } from './tiktok.crawler';

type CrawlerOptions = {
  browser: Browser;
  profileUrl: string;
};

export class CrawlerFactory {
  static createCrawler(crawlerOpt: CrawlerOptions): Crawler {
    const { browser, profileUrl } = crawlerOpt;

    const socialMedia = profileUrl.split('.')[1];

    switch (socialMedia) {
      case 'instagram':
        return new InstagramCrawler(browser, profileUrl);
      case 'tiktok':
        return new TiktokCrawler(browser, profileUrl);
      default:
        throw new Error('Invalid social media');
    }
  }
}
