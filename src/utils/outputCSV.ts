import * as fs from 'fs';
import { Parser } from '@json2csv/plainjs';

export function outputCSV<T>(data: T[], filename: string): void {
  const parser = new Parser();
  const csvOutput = parser.parse(data);

  fs.writeFileSync(filename, csvOutput, { encoding: 'utf-8' });
}
