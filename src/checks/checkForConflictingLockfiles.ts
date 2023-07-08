import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there are conflicting Node package lock files.
 */
export function checkForConflictingLockfiles(severity: Severity, basePath: string): CheckResult {
  const name = 'Lock files';
  const message = 'Check for conflicting lock files';

  const npmLockfile = exists(basePath, 'package-lock.json');
  const yarnLockfile = exists(basePath, 'yarn.lock');

  const result = !(npmLockfile && yarnLockfile);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: basePath
  };
}
