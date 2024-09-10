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
  customPath?: string,
  filetreePaths?: string[]
): CheckResult {
  const path = customPath || 'diagrams';
  const name = 'Diagrams';
  const message = 'Check for diagrams folder with contents';

  if (!customPath) logDefaultPathMessage(name, path);

  const result = (() => {
    const diagramsPath = `${basePath}/${path}`;

    if (filetreePaths && filetreePaths.length > 0)
      return hasDiagramMatches(filetreePaths, diagramsPath.replace('./', ''));
    else if (exists(diagramsPath, '')) return hasDiagramMatches(readDirectory(diagramsPath));

    return false;
  })();

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}

const hasDiagramMatches = (contents: string[], startPath: string = '') =>
  contents
    .map((fileName: string) => fileName.startsWith(startPath) && fileName.endsWith('.drawio'))
    .filter((match: boolean) => match).length > 0;
