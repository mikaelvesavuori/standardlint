import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is a template for GitHub issues.
 */
export function checkForPresenceTemplateIssues(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const path = customPath || '.github/ISSUE_TEMPLATE/issue.md';
  const name = 'Issue template';
  const message = 'Check for GitHub issue template';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = exists(basePath, path);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}
