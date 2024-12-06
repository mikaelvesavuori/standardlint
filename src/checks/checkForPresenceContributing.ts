import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there is a `CONTRIBUTING.md` file.
 */
export function checkForPresenceContributing(
  severity: Severity,
  basePath: string,
  filetreePaths?: string[]
): CheckResult {
  const path = 'CONTRIBUTING.md';
  const name = 'Contribution information';
  const message = 'Check for CONTRIBUTING file';

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
