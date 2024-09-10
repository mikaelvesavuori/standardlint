import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is a CI/CD configuration file.
 */
export function checkForPresenceCiConfig(
  severity: Severity,
  basePath: string,
  customPath?: string,
  filetreePaths?: string[]
): CheckResult {
  const path = customPath || '.github/workflows/main.yml';
  const name = 'CI configuration';
  const message = 'Check for CI configuration file';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
