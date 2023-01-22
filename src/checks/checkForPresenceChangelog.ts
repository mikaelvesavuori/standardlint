import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description Checks if there is a `CHANGELOG.md` file.
 */
export function checkForPresenceChangelog(severity: Severity, basePath: string): CheckResult {
  const CHANGELOG_FILE_PATH = 'CHANGELOG.md';
  const name = 'Check for CHANGELOG file';
  const message = 'TODO message';

  const result = checkIfFileOrDirectoryExists(basePath, CHANGELOG_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: CHANGELOG_FILE_PATH
  };
}
