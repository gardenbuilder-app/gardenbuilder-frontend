import React, { useState } from "react"
import { BrowserRouter, Link } from "react-router-dom"
import styled from "styled-components"
import { HamburgerButton } from "./HamburgerButton"
import { useCurrentUser } from "hooks"
import { Logout } from "../Logout"

const MobileHeaderStyle = styled.div`
  align-content: center;
  display: grid;
  grid-template-columns: repeat(2, auto);
  margin: 0 1rem;
`

const Menu = styled.ul`
  grid-column: 2 / 3;
  list-style-type: none;
  text-align: left;
  margin: 0;
  padding: 0;
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export const MobileHeader = function () {
  const loggedInUser = useCurrentUser()
  let [menuVisible, setMenuVisible] = useState(false)

  function toggleMenuVisibility() {
    setMenuVisible(!menuVisible)
  }

  return (
    <>
      <MobileHeaderStyle>
        <Title>GardenBuilder</Title>
        {loggedInUser && (
          <HamburgerButton toggleMenuVisibility={toggleMenuVisibility} />
        )}
        {menuVisible && (
          <Menu>
            <BrowserRouter>
              <li>
                <StyledLink to="/profile">Profile</StyledLink>
              </li>
              <li>
                <StyledLink to="/gardens">Gardens</StyledLink>
              </li>
              <li>
                <Logout />
              </li>
            </BrowserRouter>
          </Menu>
        )}
      </MobileHeaderStyle>
    </>
  )
}
