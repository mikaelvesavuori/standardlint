import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there is a `CODEOWNERS` file.
 */
export function checkForPresenceCodeowners(severity: Severity, basePath: string): CheckResult {
  const path = 'CODEOWNERS';
  const name = 'Code owners';
  const message = 'Check for CODEOWNERS file';

  const result = exists(basePath, path);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
