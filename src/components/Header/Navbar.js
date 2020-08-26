import React from 'react'
import styled from 'styled-components'

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
const NavItem = styled.li`
    cursor: pointer;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
    }
    &:active {
      font-size: 140%;
    }
`

const Navbar = function () {
  return (
    <Nav>
      <NavItem to='/beds'>
        Beds
      </NavItem>
      <NavItem to='/sections'>
        Sections
      </NavItem>
      <NavItem to='/plants'>
        Plants
      </NavItem>
    </Nav>
  )
}

export default Navbar
