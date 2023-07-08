import path from 'path';

import { readDirectory } from './readDirectory';
import { isDirectory } from './isDirectory';

/**
 * @description Gets a list of all files in a recursive manner.
 */
export function getAllFiles(directoryPath: string, arrayOfFiles: string[]): string[] {
  const files = readDirectory(directoryPath);

  files.forEach((file: string) => {
    const filePath = `${directoryPath}/${file}`;
    if (isDirectory(filePath)) arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    else arrayOfFiles.push(path.join(process.cwd(), '/', filePath));
  });

  return arrayOfFiles.filter((file) => file.endsWith('.ts'));
}
