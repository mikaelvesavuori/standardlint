import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is Infrastructure-as-Code configuration present.
 */
export function checkForPresenceIacConfig(
  severity: Severity,
  basePath: string,
  customPath?: string,
  filetreePaths?: string[]
): CheckResult {
  const path = customPath || 'serverless.yml';
  const name = 'IAC configuration';
  const message = 'Check for Infrastructure-as-Code configuration';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
