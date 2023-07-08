import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';
import { getAllFiles } from '../utils/getAllFiles';
import { readFile } from '../utils/readFile';
import { filterFiles } from '../utils/filterFiles';

/**
 * @description Checks if there is an API schema.
 */
export function checkForConsoleUsage(
  severity: Severity,
  basePath: string,
  customPath?: string,
  ignorePaths?: string[]
): CheckResult {
  const path = customPath || 'src';
  const name = 'Console usage';
  const message = 'Check for console usage';

  if (!customPath) logDefaultPathMessage(name, path);

  const files = getAllFiles(`${basePath}/${path}`, []);
  const filteredFiles =
    ignorePaths && ignorePaths.length > 0 ? filterFiles(files, ignorePaths) : files;

  const regex = /console.(.*)/gi;
  const includesConsole = filteredFiles.map((test: string) => regex.test(readFile(test)));
  const result = !includesConsole.includes(true); // We don't want any occurrences

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
