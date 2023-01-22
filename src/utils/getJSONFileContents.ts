import fs from 'fs';
import path from 'path';

import { checkIfFileOrDirectoryExists } from './checkIfFileOrDirectoryExists';

export function getJSONFileContents(basePath: string, filePath: string) {
  try {
    const fullPath = path.join(basePath, filePath);

    if (checkIfFileOrDirectoryExists(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    }

    return {};
  } catch (error) {
    console.error('Unable to read contents of file...', error);
    return {};
  }
}
