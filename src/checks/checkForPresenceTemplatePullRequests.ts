import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is a template for GitHub Pull Requests.
 */
export function checkForPresenceTemplatePullRequests(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const TEMPLATE_FILE_PATH = customPath || '.github/ISSUE_TEMPLATE/pull_request.md';
  const name = 'Check for GitHub Pull Request template';
  const message = 'TODO message';

  if (!customPath) logDefaultPathMessage(name, TEMPLATE_FILE_PATH);

  const result = checkIfFileOrDirectoryExists(basePath, TEMPLATE_FILE_PATH);

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: TEMPLATE_FILE_PATH
  };
}
