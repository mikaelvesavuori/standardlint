import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { checkIfFileOrDirectoryExists } from '../utils/checkIfFileOrDirectoryExists';
import { getDirectoryContents } from '../utils/getDirectoryContents';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is diagrams folder with diagram files in it.
 */
export function checkForPresenceDiagramsFolder(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const DIAGRAMS_FOLDER = customPath || 'diagrams';
  const name = 'Diagrams';
  const message = 'Check for diagrams folder with contents';

  if (!customPath) logDefaultPathMessage(name, DIAGRAMS_FOLDER);

  const result = (() => {
    const diagramsPath = `${basePath}/${DIAGRAMS_FOLDER}`;

    if (checkIfFileOrDirectoryExists(diagramsPath)) {
      const contents = getDirectoryContents(diagramsPath);
      const diagramMatches = contents
        .map((fileName: string) => fileName.endsWith('.drawio'))
        .filter((match: boolean) => match);
      return diagramMatches.length > 0;
    }

    return false;
  })();

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path: DIAGRAMS_FOLDER
  };
}
