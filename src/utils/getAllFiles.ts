import path from 'node:path';

import { isDirectory } from './isDirectory';
import { readDirectory } from './readDirectory';

/**
 * @description Gets a list of all files in a recursive manner.
 */
export function getAllFiles(
  directoryPath: string,
  arrayOfFiles: string[]
): string[] {
  const files = readDirectory(directoryPath);

  files.forEach((file: string) => {
    const filePath = `${directoryPath}/${file}`;
    if (isDirectory(filePath))
      // biome-ignore lint: It's OK, don't error here
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    else arrayOfFiles.push(path.join(process.cwd(), '/', filePath));
  });

  return arrayOfFiles.filter((file) => file);
}
