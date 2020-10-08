import React from "react"
import { useHistory } from "react-router-dom"
import { eraseToken } from "../../../libs"

export function Logout() {
  const history = useHistory()

  function handleLogOut() {
    eraseToken() // expire cookie for jwt token
    history.push("/login")
    window.location.reload();
  }

  return <div onClick={handleLogOut}>Log Out</div>
}
