import React, { useEffect } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import { useCookie } from "./hooks"

export function App() {
  const [cookie, setCookie] = useCookie("gardenbuilder-jwt-token", "")
  let history = useHistory("")

  /* Reroute from root to beds if logged in, else route to login */
  useEffect(() => {
    const destination = cookie ? "/gardens" : "/login"
    history.push(destination)
  })

  return null
}

export default App
