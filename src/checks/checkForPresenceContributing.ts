import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description Checks if there is a `CONTRIBUTING.md` file.
 */
export function checkForPresenceContributing(severity: Severity, basePath: string): CheckResult {
  const CONTRIBUTING_FILE_PATH = 'CONTRIBUTING.md';
  const name = 'Contribution information';
  const message = 'Check for CONTRIBUTING file';

  const result = checkIfFileOrDirectoryExists(basePath, CONTRIBUTING_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: CONTRIBUTING_FILE_PATH
  };
}
