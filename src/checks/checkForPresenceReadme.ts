import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description TODO
 */
export function checkForPresenceReadme(severity: Severity, basePath: string): CheckResult {
  const README_FILE_PATH = 'README.md';
  const name = 'Check for README file';
  const message = 'TODO message';

  const result = checkIfFileOrDirectoryExists(basePath, README_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: README_FILE_PATH
  };
}
