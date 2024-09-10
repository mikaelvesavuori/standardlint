import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there is a `SECURITY.md` file.
 */
export function checkForPresenceSecurity(
  severity: Severity,
  basePath: string,
  filetreePaths?: string[]
): CheckResult {
  const path = 'SECURITY.md';
  const name = 'Security information';
  const message = 'Check for SECURITY file';

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
