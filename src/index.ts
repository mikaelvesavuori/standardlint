#!/usr/bin/env node

import { createNewStandardLint } from './domain/StandardLint';

import { checkIfFileOrDirectoryExists } from './utils/checkIfFileOrDirectoryExists';
import { getJSONFileContents } from './utils/getJSONFileContents';
import { writeResultsToDisk } from './utils/writeResultsToDisk';

function main() {
  const isRunFromCommandLine =
    process.argv[1] && process.argv[1].includes('node_modules/.bin/standardlint');
  if (!isRunFromCommandLine) return;

  const writeOutputToDisk = process.argv[2] && process.argv[2].includes('--output');

  try {
    console.log('Running StandardLint...');

    const config = checkIfFileOrDirectoryExists('standardlint.json')
      ? getJSONFileContents(process.cwd(), 'standardlint.json')
      : {};

    const standardlint = createNewStandardLint(config);
    const results = standardlint.check();

    if (writeOutputToDisk) writeResultsToDisk(results);
  } catch (error: any) {
    console.error(error);
  }
}

main();

export { createNewStandardLint } from './domain/StandardLint';
