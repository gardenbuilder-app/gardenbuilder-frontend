import qString from "query-string"

/*
 * Gets the value of the search query in the url using the name of the query parameter
 * @param {string} paramName - name of url search param name you wish to use
 * @return {string} - the value of the url search param
 */
export function useUrlParam(paramName) {
  const params = qString.parse(window.location.search)
  return params[paramName] || null
}
