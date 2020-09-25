import React from "react"
import { useCookie } from "../../../hooks/useCookie"
import { useHistory } from "react-router-dom"

export function Logout() {
  const [cookie, setCookie] = useCookie()
  const history = useHistory()

  function handleLogOut() {
    // TODO: remove jwt token from app
    setCookie("gardenbuilder-jwt-token", "", { days: 0 })
    // TODO: route to login page
    history.push("/login")
  }
  return <li onClick={handleLogOut}>Log Out</li>
}
