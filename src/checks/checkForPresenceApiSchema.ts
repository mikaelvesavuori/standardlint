import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is an API schema.
 */
export function checkForPresenceApiSchema(
  severity: Severity,
  basePath: string,
  customPath?: string,
  filetreePaths?: string[]
): CheckResult {
  const path = customPath || 'api/schema.json';
  const name = 'API schema';
  const message = 'Check for API schema';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
