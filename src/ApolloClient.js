import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getToken } from "./libs"


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

const devEndpoint = process.env.REACT_APP_GRAPHQL_SERVER || "https://gardenbuilder-backend.uc.r.appspot.com/graphql/"

function determineEndpoint(env) {
  if (env === 'development') return devEndpoint;
  if (env === 'test') return 'http://localhost:3000/grapql'
}

const httpLink = createHttpLink({
  uri: determineEndpoint(process.env.NODE_ENV)
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    watchQuery: {
      fetchPolicy:
        process.env.NODE_ENV === 'test' ? 'no-cache' : 'cache-first',
    },
    query: {
      fetchPolicy:
        process.env.NODE_ENV === 'test' ? 'no-cache' : 'cache-first',
    }
  },
  link: authLink.concat(httpLink),
})

export default apolloClient;