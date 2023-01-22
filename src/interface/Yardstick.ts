import { Check, CheckResult, Severity } from './Check';

/**
 * @description TODO
 */
export type Configuration = {
  /**
   * @description The base path from which directory operations will happen.
   */
  basePath: string;
  /**
   * @description TODO
   */
  checks: Check[];
  /**
   * @description TODO
   */
  defaultSeverity: Severity;
};

/**
 * @description TODO
 */
export type ConfigurationInput = {
  basePath?: string;
  checks?: (string | Check)[];
  defaultSeverity?: Severity;
};

/**
 * @description TODO
 */
export type Result = {
  /**
   * @description TODO
   */
  passes: number;
  /**
   * @description TODO
   */
  warnings: number;
  /**
   * @description TODO
   */
  failures: number;
  /**
   * @description TODO
   */
  results: CheckResult[];
};
