import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import "index.css"
import { useCurrentUser } from "hooks"
import client from "ApolloClient"
import { Layout } from "./components/style"
import { Bed, Garden, Gardens, Login, Profile, Welcome } from "./pages"

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
              render={() =>
                loggedInUser ? <Redirect to="/gardens" /> : <Redirect to="/login" />
              }
            />
            <Route exact path="/login" component={Login} />
            <Route path="/bed" component={Bed} />
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
