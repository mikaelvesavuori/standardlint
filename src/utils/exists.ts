import fs from 'node:fs';
import path from 'node:path';

/**
 * @description Checks if the provided path is an actual file or directory.
 *
 * @param [basePath] This responds to the "long" file base path prior to the file.
 * @param [filePath=''] This responds to the "actual" file you want to check for.
 * @param [filetreePaths] An optional argument if you want to check against a list of paths rather that on disk.
 */
export function exists(
  basePath: string,
  filePath = '',
  filetreePaths?: string[]
): boolean {
  const fullPath = path.join(basePath, filePath);

  return filetreePaths && filetreePaths.length > 0
    ? filetreePaths.includes(fullPath.replace('./', ''))
    : fs.existsSync(fullPath);
}
