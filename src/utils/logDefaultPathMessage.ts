/**
 * @description Outputs a warning log when a default path is being used.
 */
export function logDefaultPathMessage(checkName: string, path: string) {
  console.warn(
    `🛎️  No custom path assigned to check "${checkName}" - Using default path "${path}"...`
  );
}
