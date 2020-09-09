import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
  },
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
