/**
 * @description TODO
 */
export const getStatusCount = (status: string, results: Record<string, any>) =>
  results
    .map((result: Record<string, any>) => {
      if (result.status === status) return result.status;
    })
    .filter((result: any) => result).length;
