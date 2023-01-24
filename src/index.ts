#!/usr/bin/env node

import { createNewStandardLint } from './domain/StandardLint';

import { checkIfFileOrDirectoryExists } from './utils/checkIfFileOrDirectoryExists';
import { getJSONFileContents } from './utils/getJSONFileContents';

function main() {
  const isRunFromCommandLine = process.argv[1].includes('node_modules/.bin/standardlint');
  if (!isRunFromCommandLine) return;

  try {
    console.log('Running StandardLint...');

    const config = checkIfFileOrDirectoryExists('standardlint.json')
      ? getJSONFileContents(process.cwd(), 'standardlint.json')
      : {};

    const standardlint = createNewStandardLint(config);
    return standardlint.check();
  } catch (error: any) {
    console.error(error);
  }
}

main();

export { createNewStandardLint } from './domain/StandardLint';
