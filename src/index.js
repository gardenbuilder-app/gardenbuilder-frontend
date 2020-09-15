import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter } from "react-router-dom"

/* Get token if it exists, add to header, return header */
const authLink = setContext((_, { headers }) => {
  const token = document.cookie
    .split("; ")
    .find((key) => key.startsWith("gardenbuilder-jwt-token"))
    ?.split("=")[1]

  return {
    headers: {
      ...headers,
      authorization: `JWT ${token}`,
    },
  }
})

const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_SERVER })

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
  },
  link: authLink.concat(httpLink),
})

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
