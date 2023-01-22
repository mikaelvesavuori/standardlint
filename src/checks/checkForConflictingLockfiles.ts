import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';

/**
 * @description TODO
 */
export function checkForConflictingLockfiles(severity: Severity, basePath: string): CheckResult {
  const name = 'Check for conflicting lock files';
  const message = 'TODO message';

  const npmLockfile = checkIfFileOrDirectoryExists(basePath, 'package-lock.json');
  const yarnLockfile = checkIfFileOrDirectoryExists(basePath, 'yarn.lock');

  const result = !(npmLockfile && yarnLockfile);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: basePath
  };
}
