import fs from 'fs';
import path from 'path';

/**
 * @description TODO
 */
export function checkIfFileOrDirectoryExists(basePath: string, additionalPath = ''): boolean {
  return fs.existsSync(path.join(basePath, additionalPath));
}
