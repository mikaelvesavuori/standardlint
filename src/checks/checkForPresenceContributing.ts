import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description TODO
 */
export function checkForPresenceContributing(severity: Severity, basePath: string): CheckResult {
  const CONTRIBUTING_FILE_PATH = 'CONTRIBUTING.md';
  const name = 'Check for CONTRIBUTING file';
  const message = 'TODO message';

  const result = checkIfFileOrDirectoryExists(basePath, CONTRIBUTING_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: CONTRIBUTING_FILE_PATH
  };
}
