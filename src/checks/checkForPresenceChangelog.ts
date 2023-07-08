import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';

/**
 * @description Checks if there is a `CHANGELOG.md` file.
 */
export function checkForPresenceChangelog(severity: Severity, basePath: string): CheckResult {
  const path = 'CHANGELOG.md';
  const name = 'Changelog';
  const message = 'Check for CHANGELOG file';

  const result = exists(basePath, path);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
