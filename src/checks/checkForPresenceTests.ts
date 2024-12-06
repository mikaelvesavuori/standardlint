import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { filterFiles } from '../utils/filterFiles';
import { getAllFiles } from '../utils/getAllFiles';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there are tests.
 */
export function checkForPresenceTests(
  severity: Severity,
  basePath: string,
  customPath?: string,
  ignorePaths?: string[]
): CheckResult {
  const path = customPath || 'tests';
  const name = 'Tests';
  const message = 'Check for presence of tests';

  if (!customPath) logDefaultPathMessage(name, path);

  const files = getAllFiles(`${basePath}/${path}`, []);
  const filteredFiles =
    ignorePaths && ignorePaths.length > 0
      ? filterFiles(files, ignorePaths)
      : files;

  const tests = filteredFiles.filter(
    (file: string) =>
      file.endsWith('test.ts') ||
      file.endsWith('spec.ts') ||
      file.endsWith('test.js') ||
      file.endsWith('spec.js')
  );
  const result = tests.length > 0;

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
