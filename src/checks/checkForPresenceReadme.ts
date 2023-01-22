import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description Checks if there is a `README.md` file.
 */
export function checkForPresenceReadme(severity: Severity, basePath: string): CheckResult {
  const README_FILE_PATH = 'README.md';
  const name = 'Documentation';
  const message = 'Check for README file';

  const result = checkIfFileOrDirectoryExists(basePath, README_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: README_FILE_PATH
  };
}
