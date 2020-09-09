import React from "react"
import { Layout } from "./components"
import { Login, Beds } from "./pages"
import { Switch, Route } from "react-router-dom"

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/beds" component={Beds} />
      </Switch>
    </Layout>
  )
}

export default App
