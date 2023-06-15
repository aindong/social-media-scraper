import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

async function main() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://bot.sannysoft.com/');
  await page.waitForSelector('img', { visible: true });
  await page.screenshot({ path: 'bot-test-stealth.png' });

  await browser.close();
}

main().catch(console.error);
