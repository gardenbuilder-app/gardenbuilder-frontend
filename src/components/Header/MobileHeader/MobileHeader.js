import React, { useState } from "react"
import { HamburgerButton } from "./HamburgerButton"
import useUser from 'hooks/useUser';
import { Logout } from "../Logout"
import styled from "styled-components"

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

export const MobileHeader = function () {

  const me = useUser()
  let [menuVisible, setMenuVisible] = useState(false)

  function toggleMenuVisibility() {
    setMenuVisible(!menuVisible)
  }

  return (
    <>
      <MobileHeaderStyle>
        <Title>GardenBuilder</Title>
        {me && <HamburgerButton toggleMenuVisibility={toggleMenuVisibility} />}
        {menuVisible && (
          <Menu>
          <button>Profile</button>
          <button>Gardens</button>
          <Logout/>
          </Menu>)}
      </MobileHeaderStyle>
    </>
  )
}