import type { CheckResult, Severity } from '../interface/Check';

import { calculatePass } from '../application/calculatePass';

import { exists } from '../utils/exists';
import { logDefaultPathMessage } from '../utils/logDefaultPathMessage';
import { readDirectory } from '../utils/readDirectory';

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
    if (exists(diagramsPath, ''))
      return hasDiagramMatches(readDirectory(diagramsPath));

    return false;
  })();

  return {
    name,
    status: calculatePass(result, severity),
    message,
    path
  };
}

const hasDiagramMatches = (contents: string[], startPath = '') =>
  contents
    .map(
      (fileName: string) =>
        fileName.startsWith(startPath) && fileName.endsWith('.drawio')
    )
    .filter((match: boolean) => match).length > 0;
