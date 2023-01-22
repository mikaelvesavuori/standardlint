/**
 * @description TODO
 */
export type Check = {
  name: string;
  severity: Severity;
  path?: string;
};

/**
 * @description TODO
 */
export type CheckResult = {
  name: string;
  status: Status;
  message: string;
  path?: string;
};

/**
 * @description TODO
 */
export type Status = 'pass' | 'warn' | 'fail';

/**
 * @description TODO
 */
export type Severity = 'error' | 'warn';
