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
import { BrowserRouter, Redirect } from "react-router-dom"
import { Layout } from "./components"
import { Switch, Route } from "react-router-dom"
import { Beds, Gardens, Login } from "./pages"
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
        <Layout>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return getToken() ? (
                  <Redirect to="/gardens" />
                ) : (
                  <Redirect to="/login" />
                )
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/beds" component={Beds} />
            <Route exact path="/gardens" component={Gardens} />
          </Switch>
        </Layout>
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
