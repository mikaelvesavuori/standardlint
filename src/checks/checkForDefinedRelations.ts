import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';
import { getJSONFileContents } from '../utils/getJSONFileContents';

/**
 * @description TODO
 */
export function checkForDefinedRelations(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const SERVICE_METADATA_FILE_PATH = customPath || 'manifest.json';
  const name = 'Check for defined relations';
  const message = 'TODO message';

  if (!customPath) logDefaultPathMessage(name, SERVICE_METADATA_FILE_PATH);

  const serviceMetadata: Record<string, any> = getJSONFileContents(
    basePath,
    SERVICE_METADATA_FILE_PATH
  );

  const result =
    serviceMetadata && serviceMetadata?.relations && serviceMetadata?.relations.length > 0;

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: SERVICE_METADATA_FILE_PATH
  };
}
