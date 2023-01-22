import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is a CI/CD configuration file.
 */
export function checkForPresenceCiConfig(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const CONFIG_PATH = customPath || '.github/workflows/main.yml';
  const name = 'Check for CI configuration file';
  const message = 'TODO message';

  if (!customPath) logDefaultPathMessage(name, CONFIG_PATH);

  const result = checkIfFileOrDirectoryExists(basePath, CONFIG_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: CONFIG_PATH
  };
}
