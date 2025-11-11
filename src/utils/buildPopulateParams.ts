
/**
 * Build a Strapi populate query string from an array of relation paths.
 * Example:
 *   buildPopulateParams(["topbar", "topbar.contacts"])
 * → "populate[0]=topbar&populate[1]=topbar.contacts"
 */

export function buildPopulateParams(populatePaths: string[]): string {
  if (!Array.isArray(populatePaths) || populatePaths.length === 0) {
    return "";
  }

  return populatePaths
    .map((path, index) => `populate[${index}]=${encodeURIComponent(path)}`)
    .join("&");
}

export default buildPopulateParams;
