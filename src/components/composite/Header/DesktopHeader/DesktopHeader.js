import React from "react"
import styled from "styled-components"
import { Navbar } from "./Navbar"
import { useCurrentUser } from "hooks"

const Title = styled.h1``

export const DesktopHeader = function () {
  const loggedInUser = useCurrentUser()

  return (
    <>
      <Title>GardenBuilder</Title>
      {loggedInUser ? <Navbar /> : ""}
    </>
  )
}
