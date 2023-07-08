import fs from 'fs';
import path from 'path';

import { exists } from './exists';

/**
 * @description Gets the contents of a directory as an array of strings.
 */
export function readDirectory(basePath: string) {
  const _path = path.join(basePath);
  if (exists(_path)) return fs.readdirSync(_path);
  return [];
}
