import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description TODO
 */
export function checkForPresenceLicense(severity: Severity, basePath: string): CheckResult {
  const LICENSE_FILE_PATH = 'LICENSE.md';
  const name = 'Check for LICENSE file';
  const message = 'TODO message';

  const result = checkIfFileOrDirectoryExists(basePath, LICENSE_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: LICENSE_FILE_PATH
  };
}
