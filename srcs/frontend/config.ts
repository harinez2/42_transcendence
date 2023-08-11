/**
 * Returns the value of the NEXT_PUBLIC_FRONT_URL environment variable.
 *
 * Initially, this function was designed to check any environment variable
 * passed as an argument. However, doing so led to issues when the variable
 * reference occurred at the module level, especially with frameworks like
 * Next.js where server-side rendering (SSR) and client-side rendering (CSR)
 * can lead to different evaluation timings for module-level variables.
 *
 * To circumvent this, the function now specifically checks for the
 * NEXT_PUBLIC_FRONT_URL variable when invoked, ensuring consistent and
 * expected behavior across different rendering methods.
 *
 * If other environment variables need to be accessed in a similar way in the
 * future, separate dedicated functions for each of them might be required
 * to avoid the aforementioned issues.
 *
 * @returns {string} The value of NEXT_PUBLIC_FRONT_URL
 * @throws {Error} Throws an error if NEXT_PUBLIC_FRONT_URL is not defined.
 */
function getFrontUrl(): string {
  const value = process.env.NEXT_PUBLIC_FRONT_URL;
  if (!value) {
    throw new Error("NEXT_PUBLIC_FRONT_URL is not defined.");
  }
  return value;
}

export const FRONT_URL: string = getFrontUrl();
export const API_PATH: string = `${FRONT_URL}/api`;
