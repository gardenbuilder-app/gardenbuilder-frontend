import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getToken } from "libs"

/**
 * 
 * This is the only instance of the client. It switches from development server to the mock 
 * server when running tests. Its default export should be passed to the client prop of the
 * <ApolloProvider /> instance in the render function for tests.
 * 
 */

/**
 *  Update token before query/mutation
 *  and send token with header
 */
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `JWT ${getToken()}`,
    },
  }
})

//Points to dev server
const devEndpoint =
  process.env.REACT_APP_GRAPHQL_SERVER ||
  "https://gardenbuilder-backend.uc.r.appspot.com/graphql/"

//Switches request endpoint from dev server to mock server
function determineEndpoint(env) {
  if (env === "development") return devEndpoint
  if (env === "test") return "http://localhost:8080"
}

//Switches fetchPolicy based on node environment
function determineFetchPolicy(env) {
  if (env === "test") return "no-cache"
  else return "cache-first"
}

const httpLink = createHttpLink({
  uri: determineEndpoint(process.env.NODE_ENV),
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    //Disables caching on tests to allow mocks to run properly
    watchQuery: {
      fetchPolicy: determineFetchPolicy(process.env.NODE_ENV)
    },
    query: {
      fetchPolicy: determineFetchPolicy(process.env.NODE_ENV)
    },
  },
  link: authLink.concat(httpLink),
})

export default apolloClient
