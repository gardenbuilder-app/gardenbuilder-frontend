import React from "react"
import { useHistory } from "react-router-dom"
import { eraseToken } from "../../../libs"

export function Logout() {
  const history = useHistory()

  function handleLogOut() {
    eraseToken() // expire cookie for jwt token
    history.push("/login")
  }
  return <li onClick={handleLogOut}>Log Out</li>
}
