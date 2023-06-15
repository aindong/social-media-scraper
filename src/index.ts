import chalk from 'chalk';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Crawler } from './types/crawler';
import { InstagramCrawler } from './social-media/instagram.crawler';
import { TiktokCrawler } from './social-media/tiktok.crawler';
import { Config } from './utils/config';
import { readFile } from './utils/fileManager';
import { CrawlerFactory } from './social-media/crawler.factory';
import { outputCSV } from './utils/outputCSV';
import { Influencer } from './types/influencer';

async function getProfilesToCrawl(): Promise<string[]> {
  const profiles = await readFile('profiles.txt');
  console.info(profiles);
  return profiles;
}

async function main() {
  console.info(chalk.blue('Launching social media scraper by aindong'));

  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: Config.get('CRAWLER_ENV') === 'production' ? 'new' : false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const profiles = await getProfilesToCrawl();

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
}

main().catch(console.error);
