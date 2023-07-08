import { CheckResult, Check, Severity } from '../interface/Check';
import { Configuration, ConfigurationInput, Result } from '../interface/StandardLint';

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

import { exists } from '../utils/exists';

import { MissingChecksError } from '../application/errors/errors';
import { writeResultsToDisk } from '../utils/writeResultsToDisk';

// Configuration
const DEFAULT_BASE_PATH_FALLBACK = '.';
const DEFAULT_SEVERITY_FALLBACK = 'error';

/**
 * @description Factory function to return a new `StandardLint` instance.
 */
export function createNewStandardLint(config?: ConfigurationInput) {
  return new StandardLint(config);
}

/**
 * @description `StandardLint` is an extensible standards linter and auditor.
 */
class StandardLint {
  readonly config: Configuration;

  constructor(config?: ConfigurationInput) {
    this.config = this.makeConfig(config);
  }

  /**
   * @description Validates and sanitizes user input and returns a valid Configuration.
   */
  private makeConfig(configInput?: ConfigurationInput): Configuration {
    const basePath =
      configInput?.basePath && exists(configInput.basePath)
        ? configInput.basePath
        : DEFAULT_BASE_PATH_FALLBACK;

    const defaultSeverity = configInput?.defaultSeverity
      ? this.getValidatedSeverityLevel(configInput.defaultSeverity)
      : DEFAULT_SEVERITY_FALLBACK;

    const checkList = Array.isArray(configInput?.checks) ? configInput?.checks : [];
    const checks = this.getValidatedChecks(checkList as Check[], defaultSeverity);

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
    return DEFAULT_SEVERITY_FALLBACK;
  }

  /**
   * @description Validates and sanitizes a requested list of checks.
   *
   * Provide `defaultSeverity` as it's not yet available in the class `config` object
   * when running the validation.
   */
  private getValidatedChecks(checks: (string | Check)[], defaultSeverity: Severity): Check[] {
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
      'checkForPresenceTests'
    ];

    const isValidCheckName = (name: string) => validCheckNames.includes(name);

    if (checks.includes('all')) {
      checks = validCheckNames;
      checks.shift();
    }

    const validatedChecks: Check[] = checks
      .map((check: Check | string) => {
        if (typeof check === 'string' && isValidCheckName(check))
          return <Check>{
            name: check,
            severity: defaultSeverity
          };

        if (typeof check === 'object' && isValidCheckName(check.name))
          return {
            name: check.name,
            severity: this.getValidatedSeverityLevel(check.severity)
          };

        // No match, remove in filter step
        return <Check>{
          name: '',
          severity: defaultSeverity
        };
      })
      .filter((check: Check) => check.name);

    return validatedChecks;
  }

  /**
   * @description Orchestrates the running of all checks.
   */
  public check(writeOutputToDisk = false): Result {
    if (this.config.checks.length === 0) throw new MissingChecksError();

    const results: CheckResult[] = this.config.checks.map((check: Check) => this.test(check));

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
    const { name, severity, path } = check;

    const checksList: any = {
      checkForConflictingLockfiles: () =>
        checkForConflictingLockfiles(severity, this.config.basePath),
      checkForConsoleUsage: () => checkForConsoleUsage(severity, this.config.basePath, path),
      checkForDefinedRelations: () =>
        checkForDefinedRelations(severity, this.config.basePath, path),
      checkForDefinedServiceLevelObjectives: () =>
        checkForDefinedServiceLevelObjectives(severity, this.config.basePath, path),
      checkForDefinedTags: () => checkForDefinedTags(severity, this.config.basePath, path),
      checkForPresenceApiSchema: () =>
        checkForPresenceApiSchema(severity, this.config.basePath, path),
      checkForPresenceChangelog: () => checkForPresenceChangelog(severity, this.config.basePath),
      checkForPresenceCiConfig: () =>
        checkForPresenceCiConfig(severity, this.config.basePath, path),
      checkForPresenceCodeowners: () => checkForPresenceCodeowners(severity, this.config.basePath),
      checkForPresenceContributing: () =>
        checkForPresenceContributing(severity, this.config.basePath),
      checkForPresenceDiagramsFolder: () =>
        checkForPresenceDiagramsFolder(severity, this.config.basePath, path),
      checkForPresenceIacConfig: () =>
        checkForPresenceIacConfig(severity, this.config.basePath, path),
      checkForPresenceLicense: () => checkForPresenceLicense(severity, this.config.basePath),
      checkForPresenceReadme: () => checkForPresenceReadme(severity, this.config.basePath),
      checkForPresenceSecurity: () => checkForPresenceSecurity(severity, this.config.basePath),
      checkForPresenceServiceMetadata: () =>
        checkForPresenceServiceMetadata(severity, this.config.basePath, path),
      checkForPresenceTemplateIssues: () =>
        checkForPresenceTemplateIssues(severity, this.config.basePath, path),
      checkForPresenceTemplatePullRequests: () =>
        checkForPresenceTemplatePullRequests(severity, this.config.basePath, path),
      checkForPresenceTests: () => checkForPresenceTests(severity, this.config.basePath, path)
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
