import React from "react"

export function Logout() {
  function handleLogOut() {
    // TODO: remove jwt token from app
    // TODO: route to login page
  }
  return <li onClick={handleLogOut}>Log Out</li>
}
