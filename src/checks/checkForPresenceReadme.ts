import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there is a `README.md` file.
 */
export function checkForPresenceReadme(
  severity: Severity,
  basePath: string,
  filetreePaths?: string[]
): CheckResult {
  const path = 'README.md';
  const name = 'Documentation';
  const message = 'Check for README file';

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
