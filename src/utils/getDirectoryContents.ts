import fs from 'fs';
import path from 'path';
import { checkIfFileOrDirectoryExists } from './checkIfFileOrDirectoryExists';

/**
 * @description TODO
 * @returns Array of strings
 */
export function getDirectoryContents(basePath: string) {
  if (checkIfFileOrDirectoryExists(path.join(basePath))) return fs.readdirSync(path.join(basePath));
  return [];
}
