import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';
import { getAllFiles } from '../utils/getAllFiles';
import { readFile } from '../utils/readFile';

/**
 * @description Checks if there is an API schema.
 */
export function checkForConsoleUsage(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const path = customPath || 'src';
  const name = 'Console usage';
  const message = 'Check for console usage';

  if (!customPath) logDefaultPathMessage(name, path);

  const tests = getAllFiles(`${basePath}/${path}`, []);
  const regex = /console.(.*)/gi;
  const includesConsole = tests.map((test: string) => regex.test(readFile(test)));
  const result = !includesConsole.some(() => true); // We don't want any occurrences

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
