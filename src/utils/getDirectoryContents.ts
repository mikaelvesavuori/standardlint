import fs from 'fs';
import path from 'path';
import { checkIfFileOrDirectoryExists } from './checkIfFileOrDirectoryExists';

/**
 * @description Gets the contents of a directory as an array of strings.
 */
export function getDirectoryContents(basePath: string) {
  if (checkIfFileOrDirectoryExists(path.join(basePath))) return fs.readdirSync(path.join(basePath));
  return [];
}
