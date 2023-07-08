import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there a service metadata file present.
 */
export function checkForPresenceServiceMetadata(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const path = customPath || 'manifest.json';
  const name = 'Service metadata';
  const message = 'Check for service metadata file';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = exists(basePath, path);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
