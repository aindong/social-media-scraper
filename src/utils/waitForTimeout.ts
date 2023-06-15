/**
 * Wait for a timeout
 *
 * @param ms in milliseconds
 * @returns Promise<void>
 */
export function waitForTimeout(ms: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
