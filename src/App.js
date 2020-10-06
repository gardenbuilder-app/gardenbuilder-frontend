import React from 'react';
import "./index.css"
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from './ApolloClient'
import { BrowserRouter, Redirect } from "react-router-dom"
import { Layout } from "./components"
import { Switch, Route } from "react-router-dom"
import { Beds, Garden, Gardens, Login } from "./pages"
import { getToken } from "./libs"


function App() {
  return (
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
            <Route path="/garden" component={Garden} />
          </Switch>
        </Layout>
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>
  )
}

export default App;