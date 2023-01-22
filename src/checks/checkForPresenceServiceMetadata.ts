import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there a service metadata file present.
 */
export function checkForPresenceServiceMetadata(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const SERVICE_METADATA_FILE_PATH = customPath || 'manifest.json';
  const name = 'Service metadata';
  const message = 'Check for service metadata file';

  if (!customPath) logDefaultPathMessage(name, SERVICE_METADATA_FILE_PATH);

  const result = checkIfFileOrDirectoryExists(basePath, SERVICE_METADATA_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: SERVICE_METADATA_FILE_PATH
  };
}
