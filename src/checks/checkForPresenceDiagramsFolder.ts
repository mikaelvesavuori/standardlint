import { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { readDirectory } from '../utils/readDirectory';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';

/**
 * @description Checks if there is a diagrams folder with diagram files in it.
 */
export function checkForPresenceDiagramsFolder(
  severity: Severity,
  basePath: string,
  customPath?: string
): CheckResult {
  const path = customPath || 'diagrams';
  const name = 'Diagrams';
  const message = 'Check for diagrams folder with contents';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = (() => {
    const diagramsPath = `${basePath}/${path}`;

    if (exists(diagramsPath)) {
      const contents = readDirectory(diagramsPath);
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
    path
  };
}
