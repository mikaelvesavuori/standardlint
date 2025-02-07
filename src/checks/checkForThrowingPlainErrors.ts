import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { filterFiles } from '../utils/filterFiles';
import { getAllFiles } from '../utils/getAllFiles';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';
import { readFile } from '../utils/readFile';

/**
 * @description Checks if plain (non-custom) errors are thrown.
 */
export function checkForThrowingPlainErrors(
  severity: Severity,
  basePath: string,
  customPath?: string,
  ignorePaths?: string[]
): CheckResult {
  const path = customPath || 'src';
  const name = 'Error handling';
  const message = 'Check for presence of plain (non-custom) errors';

  if (!customPath) logDefaultPathMessage(name, path);

  const files = getAllFiles(`${basePath}/${path}`, []);
  const filteredFiles =
    ignorePaths && ignorePaths.length > 0
      ? filterFiles(files, ignorePaths)
      : files;

  const regex = /(throw Error|throw new Error)(.*)/gi;
  const includesError = filteredFiles.map((test: string) =>
    regex.test(readFile(test))
  );

  const result = !includesError.includes(true);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
