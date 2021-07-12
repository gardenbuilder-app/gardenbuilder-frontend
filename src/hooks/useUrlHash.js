import queryString from "query-string"

/*
 * Gets the value of the search query in the url using the name of the query parameter
 * @return {string} - the value of the url search param
 */
export function useUrlHash() {
  const parsedHash = queryString.parse(window.location?.hash)
  return parsedHash
}
