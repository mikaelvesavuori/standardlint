import fs from 'node:fs';

/**
 * @description Writes a file to disk with results.
 */
export function writeResultsToDisk(data: Record<string, any>) {
  const fileName = 'standardlint.results.json';
  fs.writeFileSync(
    `${process.cwd()}/${fileName}`,
    JSON.stringify(data, null, '\t')
  );
}
