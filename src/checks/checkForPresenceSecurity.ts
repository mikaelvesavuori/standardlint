import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description TODO
 */
export function checkForPresenceSecurity(severity: Severity, basePath: string): CheckResult {
  const SECURITY_FILE_PATH = 'SECURITY.md';
  const name = 'Check for SECURITY file';
  const message = 'TODO message';

  const result = checkIfFileOrDirectoryExists(basePath, SECURITY_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: SECURITY_FILE_PATH
  };
}
