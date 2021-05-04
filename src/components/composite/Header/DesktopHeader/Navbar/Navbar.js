import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Logout } from "components/composite/Header/Logout"

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style-type: none;
`

/**
 * Styled nav item
 * lower opacity if hover
 * increase font size if active
 */
const NavItem = styled(Link)`
  cursor: pointer;
  color: black;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    font-size: 140%;
  }
`

export function Navbar() {
  return (
    <Nav>
      <NavItem to="/gardens">Gardens</NavItem>
      <NavItem to="/beds">Beds</NavItem>
      <NavItem to="/sections">Sections</NavItem>
      <NavItem to="/plants">Plants</NavItem>
      <NavItem to="/profile">Profile</NavItem>
      <NavItem to="/login">
        <Logout />
      </NavItem>
    </Nav>
  )
}
