import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { getJSONFileContents } from '../utils/getJSONFileContents';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if the service metadata defines Service Level Objectives.
 */
export function checkForDefinedServiceLevelObjectives(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const path = customPath || 'manifest.json';
  const name = 'SLOs';
  const message = 'Check for defined Service Level Objectives';

  if (!customPath) logDefaultPathMessage(name, path);

  const serviceMetadata: Record<string, any> = getJSONFileContents(
    basePath,
    path
  );

  const result = serviceMetadata?.slo && serviceMetadata?.slo.length > 0;

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
