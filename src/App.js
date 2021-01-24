import React from "react"
import { BrowserRouter, Redirect } from "react-router-dom"
import { Switch, Route } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"

import "index.css"
import { useCurrentUser } from "hooks"
import client from "ApolloClient"
import { Layout } from "./components/style"
import { Beds, Garden, Gardens, Login, Profile, Welcome } from "./pages"

function App() {
  const loggedInUser = useCurrentUser()
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Layout>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (loggedInUser) return <Redirect to="/gardens" />
                else return <Redirect to="/login" />
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/beds" component={Beds} />
            <Route path="/garden" component={Garden} />
            <Route exact path="/gardens" component={Gardens} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/welcome" component={Welcome} />
          </Switch>
        </Layout>
      </React.StrictMode>
    </BrowserRouter>
  )
}

const AppWithApollo = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default AppWithApollo
