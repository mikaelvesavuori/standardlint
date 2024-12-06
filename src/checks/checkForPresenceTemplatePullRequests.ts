import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is a template for GitHub Pull Requests.
 */
export function checkForPresenceTemplatePullRequests(
  severity: Severity,
  basePath: string,
  customPath?: string,
  filetreePaths?: string[]
): CheckResult {
  const path = customPath || '.github/ISSUE_TEMPLATE/pull_request.md';
  const name = 'PR template';
  const message = 'Check for GitHub Pull Request template';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = exists(basePath, path, filetreePaths);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
