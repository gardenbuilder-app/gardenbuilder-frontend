import React from "react"
import styled from "styled-components"
import { Navbar } from "./Navbar"
import { useCurrentUser } from "hooks"

const Title = styled.h1``

<<<<<<< HEAD
// const ProfileIconWrapper = styled.span`
//   display: inline-block;
//   position: absolute;
//   right: 2rem;
//   top: 30px;
// `

=======
>>>>>>> 1fb4c7234da75f1bddbbe525a58a0affe91baf7d
export const DesktopHeader = function () {
  const loggedInUser = useCurrentUser()

  return (
    <>
      <Title>GardenBuilder</Title>
      {loggedInUser ? <Navbar /> : ""}
    </>
  )
}
