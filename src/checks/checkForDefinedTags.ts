import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { getJSONFileContents } from '../utils/getJSONFileContents';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if the service metadata defines tags.
 */
export function checkForDefinedTags(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const path = customPath || 'manifest.json';
  const name = 'Tags';
  const message = 'Check for defined tags';

  if (!customPath) logDefaultPathMessage(name, path);

  const serviceMetadata: Record<string, any> = getJSONFileContents(
    basePath,
    path
  );

  const result =
    serviceMetadata?.spec?.tags && serviceMetadata?.spec?.tags.length > 0;

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
