import React from "react"
import { FaBars } from "react-icons/fa"
import { IconContext } from "react-icons"
import styled from "styled-components"
import { colors } from "../../../../styles/global"

const StyledButton = styled.button`
  justify-self: center;
  background: none;
  border: none;
`

export const HamburgerButton = function ({ toggleMenuVisibility }) {
  return (
    <StyledButton onClick={toggleMenuVisibility}>
      <IconContext.Provider value={{ size: "2rem" }}>
        <FaBars
          alt="Show navigation options"
          aria-label="hamburger menu"
          role="img"
        />
      </IconContext.Provider>
    </StyledButton>
  )
}
