import path from 'path';

import { exists } from './exists';
import { readFile } from './readFile';

export function getJSONFileContents(basePath: string, filePath: string) {
  try {
    const fullPath = path.join(basePath, filePath);
    if (exists(fullPath)) return JSON.parse(readFile(fullPath));
    return {};
  } catch (error) {
    console.error('Unable to read contents of file...', error);
    return {};
  }
}
