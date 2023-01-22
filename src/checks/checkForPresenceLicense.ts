import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description Checks if there is a `LICENSE.md` file.
 */
export function checkForPresenceLicense(severity: Severity, basePath: string): CheckResult {
  const LICENSE_FILE_PATH = 'LICENSE.md';
  const name = 'License';
  const message = 'Check for LICENSE file';

  const result = checkIfFileOrDirectoryExists(basePath, LICENSE_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: LICENSE_FILE_PATH
  };
}
