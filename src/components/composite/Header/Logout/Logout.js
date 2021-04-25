import React from "react"
import { useHistory } from "react-router-dom"
import { eraseToken } from "libs"

export function Logout() {
  const history = useHistory()

  async function handleLogOut() {
    history.push("/login")
    eraseToken()
    window.location.reload()
  }

  return <div onClick={handleLogOut}>Log Out</div>
}
