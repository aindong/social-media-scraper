import chalk from 'chalk';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Crawler } from './types/crawler';
import { InstagramCrawler } from './social-media/instagram.crawler';
import { TiktokCrawler } from './social-media/tiktok.crawler';
import { Config } from './utils/config';
import { readFile } from './utils/fileManager';

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
  while (profiles.length > 0) {
    const profile = profiles.pop();
    if (profile) {
      let crawler: Crawler | null = null;
      // check what social media it is
      // if tiktok, create a tiktok crawler
      // if instagram, create an instagram crawler
      if (profile.includes('instagram.com')) {
        // create a tiktok crawler
        crawler = new InstagramCrawler(browser, profile);
      }

      if (profile.includes('tiktok.com')) {
        // create a tiktok crawler
        crawler = new TiktokCrawler(browser, profile);
      }

      if (!crawler) {
        console.error(chalk.red(`No crawler found for ${profile}`));
        continue;
      }

      const result = await crawler.crawl();
      console.info(chalk.blue(`Done crawling ${profile}`));
      console.log(result);
    }
  }
  console.info(chalk.blue('Done crawling'));

  // const page = await browser.newPage();

  // await page.goto('https://www.tiktok.com/@mrnigelng');
  // // wait for 5 secs
  // await waitForTimeout(5000);
  // await page.screenshot({ path: 'screen-capture.png' });

  await browser.close();
}

main().catch(console.error);
