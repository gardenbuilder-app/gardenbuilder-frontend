import React from "react"
import { SIGNOUT_MUTATION } from '../../../mutations/mutations'
import { CURRENT_USER_QUERY } from '../../../queries/queries'
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom"
import { eraseToken } from "../../../libs"

export function Logout() {
  const [signout, { loading, error }] = useMutation(SIGNOUT_MUTATION)
  const history = useHistory()

  function handleLogOut() {
    if (error) console.log(error);
    signout()
    history.push("/login")
  }

  return <div onClick={handleLogOut}>Log Out</div>
}