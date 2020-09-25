/**
 * Get JWT token from cookie
 * @returns {string} token
 */
export function getToken() {
  return document.cookie
    .split("; ")
    .find((key) => key.startsWith("gardenbuilder-jwt-token"))
    ?.split("=")[1]
}
