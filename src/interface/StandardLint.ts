import { Check, CheckInput, CheckResult, Severity } from './Check';

/**
 * @description The `StandardLint` configuration.
 */
export type Configuration = {
  /**
   * @description The base path from which directory operations will happen.
   */
  basePath: string;
  /**
   * @description The list of checks the user wants to run.
   */
  checks: Check[];
  /**
   * @description Unless checks have specific Severity levels, this will be the
   * default fallback level.
   */
  defaultSeverity: Severity;
};

/**
 * @description User input for running `StandardLint`.
 */
export type ConfigurationInput = {
  basePath?: string;
  checks?: (string | CheckInput)[];
  defaultSeverity?: Severity;
};

/**
 * @description The final output of `StandardLint` and its checks.
 */
export type Result = {
  /**
   * @description How many checks passed?
   */
  passes: number;
  /**
   * @description How many checks resulted in warnings?
   */
  warnings: number;
  /**
   * @description How many checks resulted in failure?
   */
  failures: number;
  /**
   * @description A list of all individual check results.
   */
  results: CheckResult[];
};
