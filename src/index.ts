import chalk from 'chalk';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Crawler } from './types/crawler';
import { Config } from './utils/config';
import { CrawlerFactory } from './social-media/crawler.factory';
import { outputCSV } from './utils/outputCSV';
import { Influencer } from './types/influencer';

export default async function SocialMediaScraper(
  profiles: string[],
): Promise<Influencer[]> {
  console.info(chalk.blue('Launching social media scraper by aindong'));

  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: Config.get('CRAWLER_ENV') === 'production' ? 'new' : false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  // const profiles = await getProfilesToCrawl();

  console.info(chalk.blue(`Crawling ${profiles.length} profiles`));
  const data: Influencer[] = [];
  while (profiles.length > 0) {
    const profile = profiles.pop();
    if (profile) {
      let crawler: Crawler = CrawlerFactory.createCrawler({
        browser,
        profileUrl: profile,
      });

      const result = await crawler.crawl();
      if (!result) {
        console.info(chalk.red(`Failed to crawl ${profile}`));
        continue;
      }

      console.info(chalk.blue(`Done crawling ${profile}`));
      data.push(result);
    }
  }

  // output to csv
  outputCSV<Influencer>(data, `output.csv`);

  console.info(chalk.blue(`Done crawling and output to csv`));

  await browser.close();

  return data;
}
