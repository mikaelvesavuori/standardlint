/**
 * @description Filters out file paths based on provided ignore paths.
 */
export function filterFiles(files: string[], ignorePaths: string[]) {
  return files.filter((file: string) =>
    ignorePaths.every((ignorePath: string) => {
      const localFilePath = file.replace(process.cwd(), ''); // This is so we don't catch on other file paths in the system
      return !localFilePath.includes(ignorePath);
    })
  );
}
