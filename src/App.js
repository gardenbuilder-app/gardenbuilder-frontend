import React, { useEffect } from "react"
import { Layout } from "./components"
import { Beds, Gardens, Login } from "./pages"
import { Switch, Route, useHistory } from "react-router-dom"
import { useCookie } from "./hooks"

export function App() {
  const [cookie, setCookie] = useCookie("gardenbuilder-jwt-token", "")
  let history = useHistory("")

  useEffect(() => {
    /* Reroute from root to beds if logged in */
    if (cookie) {
      history.push("/gardens")
    }
  })

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/beds" component={Beds} />
        <Route exact path="/gardens" component={Gardens} />
      </Switch>
    </Layout>
  )
}

export default App
