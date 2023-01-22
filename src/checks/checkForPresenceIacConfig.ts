import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description TODO
 */
export function checkForPresenceIacConfig(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const IAC_CONFIG_PATH = customPath || 'serverless.yml';
  const name = 'Check for Infrastructure-as-Code configuration';
  const message = 'TODO message';

  if (!customPath) logDefaultPathMessage(name, IAC_CONFIG_PATH);

  const result = checkIfFileOrDirectoryExists(basePath, IAC_CONFIG_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: basePath
  };
}
