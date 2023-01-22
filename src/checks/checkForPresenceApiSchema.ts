import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is an API schema.
 */
export function checkForPresenceApiSchema(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const API_SCHEMA_PATH = customPath || 'api/schema.json';
  const name = 'Check for API schema';
  const message = 'TODO message';

  if (!customPath) logDefaultPathMessage(name, API_SCHEMA_PATH);

  const result = checkIfFileOrDirectoryExists(basePath, API_SCHEMA_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: API_SCHEMA_PATH
  };
}
