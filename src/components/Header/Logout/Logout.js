import React from "react"
import { SIGNOUT_MUTATION } from 'mutations'
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom"
import { eraseToken } from 'libs'

export function Logout() {
  const [signout] = useMutation(SIGNOUT_MUTATION)
  const history = useHistory()

  async function handleLogOut() {
    history.push("/login")
    eraseToken()
    await signout()
  }

  return <div onClick={handleLogOut}>Log Out</div>
}