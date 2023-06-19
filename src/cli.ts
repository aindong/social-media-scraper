import SocialMediaScraper from '.';
import { readFile } from './utils/fileManager';

async function getProfilesToCrawl(): Promise<string[]> {
  const profiles = await readFile('profiles.txt');
  console.info(profiles);
  return profiles;
}

async function main(): Promise<void> {
  const profiles = await getProfilesToCrawl();
  const data = await SocialMediaScraper(profiles);

  console.log(JSON.stringify(data, null, 2));
}

main().catch((err) => console.error(err));
