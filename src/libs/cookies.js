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

/**
 * Insert JWT token into cookie
 */
export function setToken(value, days = 7) {
  let expirationDate = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 1200 * 1000)
    expirationDate = date.toGMTString()
  }
  document.cookie = `gardenbuilder-jwt-token=${value};`
  document.cookie = `expires=${expirationDate};`
}

/**
 * Set cookie value to empty and date to expired
 */
export function eraseToken() {
  setToken("", -1)
}
