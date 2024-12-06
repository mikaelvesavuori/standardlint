import type { Severity, Status } from '../interface/Check';

/**
 * @description Utility function that assists with return a false passing result
 * only if the severity threshold is `error`, else warns on failures, and
 * returns true for anything else.
 */
export function calculatePass(
  predicatePassResult: boolean,
  severity: Severity
): Status {
  if (!predicatePassResult && severity === 'error') return 'fail';
  if (!predicatePassResult && severity === 'warn') return 'warn';
  return 'pass';
}
