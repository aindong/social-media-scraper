import SocialMediaScraper from '.';
import { Influencer } from './types/influencer';
import { readFile } from './utils/fileManager';
import { outputCSV } from './utils/outputCSV';

async function getProfilesToCrawl(): Promise<string[]> {
  const profiles = await readFile('profiles.txt');
  console.info(profiles);
  return profiles;
}

async function main(): Promise<void> {
  const profiles = await getProfilesToCrawl();
  const data = await SocialMediaScraper(profiles);

  console.log(JSON.stringify(data, null, 2));
  outputCSV<Influencer>(data, `output.csv`);
}

main().catch((err) => console.error(err));
