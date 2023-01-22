import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description Checks if there is a `CODEOWNERS` file.
 */
export function checkForPresenceCodeowners(severity: Severity, basePath: string): CheckResult {
  const CODEOWNERS_FILE_PATH = 'CODEOWNERS';
  const name = 'Code owners';
  const message = 'Check for CODEOWNERS file';

  const result = checkIfFileOrDirectoryExists(basePath, CODEOWNERS_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: CODEOWNERS_FILE_PATH
  };
}
