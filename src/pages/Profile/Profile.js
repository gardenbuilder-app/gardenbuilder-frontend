import React from "react"
import styled from "styled-components"

import { useCurrentUser } from "hooks"

const Center = styled.div`
  margin-left: 4rem;
`

export function Profile() {
  const loggedInUser = useCurrentUser()

  if (!loggedInUser) return <p>Loading...</p>
  return (
    <Center>
      <h2>Profile</h2>
      <p>User: {loggedInUser.user.email}</p>
      <p>User Since: userSinceHere</p>
      <p>
        Update Password:
        <span> inputElementHereToUpdatePassword</span>
      </p>
    </Center>
  )
}
