/**
 * @description Check as input by the user.
 */
export type CheckInput = {
  name: string;
  severity?: Severity;
  path?: string;
};

/**
 * @description The shape of a standalone Check.
 */
export type Check = {
  name: string;
  severity: Severity;
  path: string;
};

/**
 * @description The output of running a Check.
 */
export type CheckResult = {
  name: string;
  status: Status;
  message: string;
  path?: string;
};

/**
 * @description Represents the final state of running a check.
 */
export type Status = 'pass' | 'warn' | 'fail';

/**
 * @description Represents how severe a non-passing state is.
 */
export type Severity = 'error' | 'warn';
