import * as fs from 'fs';
import { waitForTimeout } from './waitForTimeout';

export async function readFile(filePath: string): Promise<string[]> {
  const fileData: string[] = [];

  // read the csv file from root directory
  fs.createReadStream(filePath, { encoding: 'utf-8' })
    .on('data', (chunk) => {
      fileData.push(chunk.toString());
    })
    .on('end', async () => {
      console.info(`Finished reading the file`);
    })
    .on('error', (err) => console.error(err));

  // delay the process
  await waitForTimeout(1000);

  return fileData;
}
