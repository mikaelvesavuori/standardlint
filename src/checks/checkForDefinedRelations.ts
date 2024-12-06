import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { getJSONFileContents } from '../utils/getJSONFileContents';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if the service metadata defines system relations.
 */
export function checkForDefinedRelations(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const path = customPath || 'manifest.json';
  const name = 'Relations';
  const message = 'Check for defined relations';

  if (!customPath) logDefaultPathMessage(name, path);

  const serviceMetadata: Record<string, any> = getJSONFileContents(
    basePath,
    path
  );

  const result =
    serviceMetadata?.relations && serviceMetadata?.relations.length > 0;

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
