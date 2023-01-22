import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description Checks if there is a `SECURITY.md` file.
 */
export function checkForPresenceSecurity(severity: Severity, basePath: string): CheckResult {
  const SECURITY_FILE_PATH = 'SECURITY.md';
  const name = 'Security information';
  const message = 'Check for SECURITY file';

  const result = checkIfFileOrDirectoryExists(basePath, SECURITY_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: SECURITY_FILE_PATH
  };
}
