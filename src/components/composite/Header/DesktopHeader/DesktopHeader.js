import React from "react"
import styled from "styled-components"
import { Navbar } from "./Navbar"
import { useCurrentUser } from "hooks"

const Title = styled.h1``

// const ProfileIconWrapper = styled.span`
//   display: inline-block;
//   position: absolute;
//   right: 2rem;
//   top: 30px;
// `

export const DesktopHeader = function() {
  const loggedInUser = useCurrentUser()

  return (
    <>
      <Title>GardenBuilder</Title>
      {loggedInUser ? <Navbar /> : ''}
    </>
  )
}
