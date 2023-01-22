import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description TODO
 */
export function checkForPresenceCodeowners(severity: Severity, basePath: string): CheckResult {
  const CODEOWNERS_FILE_PATH = 'CODEOWNERS.md';
  const name = 'Check for CODEOWNERS file';
  const message = 'TODO message';

  const result = checkIfFileOrDirectoryExists(basePath, CODEOWNERS_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: CODEOWNERS_FILE_PATH
  };
}
