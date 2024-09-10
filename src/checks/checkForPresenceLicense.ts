import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there is a `LICENSE.md` file.
 */
export function checkForPresenceLicense(
  severity: Severity,
  basePath: string,
  filetreePaths?: string[]
): CheckResult {
  const path = 'LICENSE.md';
  const name = 'License';
  const message = 'Check for LICENSE file';

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
