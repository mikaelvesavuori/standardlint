import type {
  Check,
  CheckInput,
  CheckResult,
  IgnorePath,
  Severity
} from '../interface/Check';
import type {
  Configuration,
  ConfigurationInput,
  Result
} from '../interface/StandardLint';

import { getStatusCount } from '../application/getStatusCount';

import { checkForConflictingLockfiles } from '../checks/checkForConflictingLockfiles';
import { checkForConsoleUsage } from '../checks/checkForConsoleUsage';
import { checkForDefinedRelations } from '../checks/checkForDefinedRelations';
import { checkForDefinedServiceLevelObjectives } from '../checks/checkForDefinedServiceLevelObjectives';
import { checkForDefinedTags } from '../checks/checkForDefinedTags';
import { checkForPresenceApiSchema } from '../checks/checkForPresenceApiSchema';
import { checkForPresenceChangelog } from '../checks/checkForPresenceChangelog';
import { checkForPresenceCiConfig } from '../checks/checkForPresenceCiConfig';
import { checkForPresenceCodeowners } from '../checks/checkForPresenceCodeowners';
import { checkForPresenceContributing } from '../checks/checkForPresenceContributing';
import { checkForPresenceDiagramsFolder } from '../checks/checkForPresenceDiagramsFolder';
import { checkForPresenceIacConfig } from '../checks/checkForPresenceIacConfig';
import { checkForPresenceLicense } from '../checks/checkForPresenceLicense';
import { checkForPresenceReadme } from '../checks/checkForPresenceReadme';
import { checkForPresenceSecurity } from '../checks/checkForPresenceSecurity';
import { checkForPresenceServiceMetadata } from '../checks/checkForPresenceServiceMetadata';
import { checkForPresenceTemplateIssues } from '../checks/checkForPresenceTemplateIssues';
import { checkForPresenceTemplatePullRequests } from '../checks/checkForPresenceTemplatePullRequests';
import { checkForPresenceTests } from '../checks/checkForPresenceTests';
import { checkForThrowingPlainErrors } from '../checks/checkForThrowingPlainErrors';

import { exists } from '../utils/exists';

import {
  InvalidFiletreeError,
  MissingChecksError
} from '../application/errors/errors';
import { writeResultsToDisk } from '../utils/writeResultsToDisk';

/**
 * @description Factory function to return a new `StandardLint` instance.
 */
export function createNewStandardLint(
  config?: ConfigurationInput,
  filetree?: string[]
) {
  return new StandardLint(config, filetree);
}

/**
 * @description `StandardLint` is an extensible standards linter and auditor.
 *
 * If you want to use a static representation of paths rather than actually checking
 * on disk, then this is possible using the `filetree` parameter.
 *
 * @example
 * import { createNewStandardLint } from 'standardlint';
 *
 * const config = {
 *   checks: [
 *     { name: 'checkForPresenceContributing', severity: 'warn' },
 *     { name: 'checkForPresenceLicense', severity: 'error' }
 *   ]
 * };
 *
 * const standardLint = createNewStandardLint(config);
 * const results = standardLint.check();

 * @example
 * const standardlint = createNewStandardLint(config, ['path/to/file.js']);
 */
class StandardLint {
  private readonly defaultBasePathFallback = '.';
  private readonly defaultSeverityFallback = 'error';
  private readonly defaultIgnorePathsFallback = [];
  readonly config: Configuration;
  private readonly filetree: string[] = [];

  constructor(config?: ConfigurationInput, filetree?: string[]) {
    this.config = this.makeConfig(config);

    if (filetree) {
      if (this.validateFiletree(filetree)) this.filetree = filetree;
      else throw new InvalidFiletreeError();
    }
  }

  /**
   * @description Validate that the filetree is a non-empty array with only strings.
   */
  private validateFiletree(filetree: string[]) {
    if (filetree && Array.isArray(filetree) && filetree.length > 0) {
      if (filetree.every((path) => typeof path === 'string')) return true;
    }

    return false;
  }

  /**
   * @description Validates and sanitizes user input and returns a valid Configuration.
   */
  private makeConfig(configInput?: ConfigurationInput): Configuration {
    const basePath =
      configInput?.basePath && exists(configInput.basePath)
        ? configInput.basePath
        : this.defaultBasePathFallback;

    const defaultSeverity = configInput?.defaultSeverity
      ? this.getValidatedSeverityLevel(configInput.defaultSeverity)
      : this.defaultSeverityFallback;

    const ignorePaths = configInput?.ignorePaths
      ? this.getSanitizedPaths(configInput.ignorePaths)
      : this.defaultIgnorePathsFallback;

    const checkList = Array.isArray(configInput?.checks)
      ? configInput?.checks
      : [];
    const checks = this.getValidatedChecks(
      checkList as CheckInput[],
      defaultSeverity,
      ignorePaths
    );

    return {
      basePath,
      checks,
      defaultSeverity
    } as Configuration;
  }

  /**
   * @description Validates and sanitizes a requested Severity level.
   */
  private getValidatedSeverityLevel(severity: Severity): Severity {
    const validSeverityLevels = ['warn', 'error'];

    if (validSeverityLevels.includes(severity)) return severity;
    return this.defaultSeverityFallback;
  }

  /**
   * @description Sanitizes provided paths or return empty array if none is provided.
   */
  private getSanitizedPaths(ignorePaths: IgnorePath[]) {
    if (ignorePaths.length === 0) return [];
    return ignorePaths.filter((path: string) => typeof path === 'string');
  }

  /**
   * @description Validates and sanitizes a requested list of checks.
   *
   * Provide `defaultSeverity` as it's not yet available in the class `config` object
   * when running the validation.
   */
  private getValidatedChecks(
    checks: (string | CheckInput)[],
    defaultSeverity: Severity,
    ignorePaths: IgnorePath[]
  ): Check[] {
    const validCheckNames = [
      'all',
      'checkForConflictingLockfiles',
      'checkForConsoleUsage',
      'checkForDefinedRelations',
      'checkForDefinedServiceLevelObjectives',
      'checkForDefinedTags',
      'checkForPresenceApiSchema',
      'checkForPresenceChangelog',
      'checkForPresenceCiConfig',
      'checkForPresenceCodeowners',
      'checkForPresenceContributing',
      'checkForPresenceDiagramsFolder',
      'checkForPresenceIacConfig',
      'checkForPresenceLicense',
      'checkForPresenceReadme',
      'checkForPresenceSecurity',
      'checkForPresenceServiceMetadata',
      'checkForPresenceTemplateIssues',
      'checkForPresenceTemplatePullRequests',
      'checkForPresenceTests',
      'checkForThrowingPlainErrors'
    ];

    const isValidCheckName = (name: string) => validCheckNames.includes(name);

    if (checks.includes('all')) {
      // biome-ignore lint: It's OK, don't error here
      checks = validCheckNames;
      validCheckNames.shift();
    }

    const validatedChecks: Check[] = checks
      .map((check: CheckInput | string) => {
        if (typeof check === 'string' && isValidCheckName(check))
          return <Check>{
            name: check,
            severity: defaultSeverity,
            ignorePaths
          };

        if (typeof check === 'object' && isValidCheckName(check.name))
          return <Check>{
            name: check.name,
            path: check.path || '',
            severity: this.getValidatedSeverityLevel(
              check.severity || defaultSeverity
            ),
            ignorePaths
          };

        // No match, remove in filter step
        return <Check>{
          name: ''
        };
      })
      .filter((check: CheckInput) => check.name);

    return validatedChecks as Check[];
  }

  /**
   * @description Orchestrates the running of all checks.
   */
  public check(writeOutputToDisk = false): Result {
    if (this.config.checks.length === 0) throw new MissingChecksError();

    const results: CheckResult[] = this.config.checks.map((check: Check) =>
      this.test(check)
    );

    const checkResults = {
      passes: getStatusCount('pass', results),
      warnings: getStatusCount('warn', results),
      failures: getStatusCount('fail', results),
      results
    };

    if (writeOutputToDisk) writeResultsToDisk(checkResults);

    return checkResults;
  }

  /**
   * @description Run test on an individual Check.
   */
  private test(check: Check): CheckResult {
    const { name, severity, path, ignorePaths } = check;

    const checksList: any = {
      checkForConflictingLockfiles: () =>
        checkForConflictingLockfiles(
          severity,
          this.config.basePath,
          this.filetree
        ),
      checkForConsoleUsage: () =>
        checkForConsoleUsage(severity, this.config.basePath, path, ignorePaths),
      checkForDefinedRelations: () =>
        checkForDefinedRelations(severity, this.config.basePath, path),
      checkForDefinedServiceLevelObjectives: () =>
        checkForDefinedServiceLevelObjectives(
          severity,
          this.config.basePath,
          path
        ),
      checkForDefinedTags: () =>
        checkForDefinedTags(severity, this.config.basePath, path),
      checkForPresenceApiSchema: () =>
        checkForPresenceApiSchema(
          severity,
          this.config.basePath,
          path,
          this.filetree
        ),
      checkForPresenceChangelog: () =>
        checkForPresenceChangelog(
          severity,
          this.config.basePath,
          this.filetree
        ),
      checkForPresenceCiConfig: () =>
        checkForPresenceCiConfig(
          severity,
          this.config.basePath,
          path,
          this.filetree
        ),
      checkForPresenceCodeowners: () =>
        checkForPresenceCodeowners(
          severity,
          this.config.basePath,
          this.filetree
        ),
      checkForPresenceContributing: () =>
        checkForPresenceContributing(
          severity,
          this.config.basePath,
          this.filetree
        ),
      checkForPresenceDiagramsFolder: () =>
        checkForPresenceDiagramsFolder(
          severity,
          this.config.basePath,
          path,
          this.filetree
        ),
      checkForPresenceIacConfig: () =>
        checkForPresenceIacConfig(
          severity,
          this.config.basePath,
          path,
          this.filetree
        ),
      checkForPresenceLicense: () =>
        checkForPresenceLicense(severity, this.config.basePath, this.filetree),
      checkForPresenceReadme: () =>
        checkForPresenceReadme(severity, this.config.basePath, this.filetree),
      checkForPresenceSecurity: () =>
        checkForPresenceSecurity(severity, this.config.basePath, this.filetree),
      checkForPresenceServiceMetadata: () =>
        checkForPresenceServiceMetadata(
          severity,
          this.config.basePath,
          path,
          this.filetree
        ),
      checkForPresenceTemplateIssues: () =>
        checkForPresenceTemplateIssues(
          severity,
          this.config.basePath,
          path,
          this.filetree
        ),
      checkForPresenceTemplatePullRequests: () =>
        checkForPresenceTemplatePullRequests(
          severity,
          this.config.basePath,
          path,
          this.filetree
        ),
      checkForPresenceTests: () =>
        checkForPresenceTests(
          severity,
          this.config.basePath,
          path,
          ignorePaths
        ),
      checkForThrowingPlainErrors: () =>
        checkForThrowingPlainErrors(
          severity,
          this.config.basePath,
          path,
          ignorePaths
        )
    };

    const result = checksList[name]();
    this.logResult(result);

    return result;
  }

  /**
   * @description Outputs a log with the check result.
   */
  private logResult(checkResult: CheckResult) {
    const { status, name } = checkResult;

    if (status === 'pass') console.log('✅ PASS:', name);
    if (status === 'warn') console.warn('⚠️ WARN:', name);
    if (status === 'fail') console.error('❌ FAIL:', name);
  }
}
