import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description TODO
 */
export function checkForPresenceServiceMetadata(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const SERVICE_METADATA_FILE_PATH = customPath || 'manifest.json';
  const name = 'Check for service metadata file';
  const message = 'TODO message';

  if (!customPath) logDefaultPathMessage(name, SERVICE_METADATA_FILE_PATH);

  const result = checkIfFileOrDirectoryExists(basePath, SERVICE_METADATA_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: SERVICE_METADATA_FILE_PATH
  };
}
