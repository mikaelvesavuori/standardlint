import type { CheckResult } from '../interface/Check';

/**
 * @description Gets the number of count for a given status.
 */
export const getStatusCount = (status: string, results: CheckResult[]) =>
  results
    .map((result: CheckResult) => {
      if (result.status === status) return result.status;
    })
    .filter((result) => result).length;
