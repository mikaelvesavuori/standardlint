import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there are conflicting Node package lock files.
 */
export function checkForConflictingLockfiles(
  severity: Severity,
  basePath: string,
  filetreePaths?: string[]
): CheckResult {
  const name = 'Lock files';
  const message = 'Check for conflicting lock files';

  const npmLockfile = exists(basePath, 'package-lock.json', filetreePaths);
  const yarnLockfile = exists(basePath, 'yarn.lock', filetreePaths);

  const result = !(npmLockfile && yarnLockfile);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: basePath
  };
}
