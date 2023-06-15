import chalk from 'chalk';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

async function main() {
  console.info(chalk.blue('Launching social media scraper by aindong'));

  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();

  await page.goto('https://www.tiktok.com/@mrnigelng');
  // wait for 5 secs
  await new Promise((r) => setTimeout(r, 5000));
  await page.screenshot({ path: 'screen-capture.png' });

  await browser.close();
}

main().catch(console.error);
