import React from "react"
import { FaBars } from "react-icons/fa"
import { IconContext } from "react-icons"
import styled from "styled-components"
import { colors } from "../../../../styles/global"

const StyledButton = styled.button`
  background: none;
  border: none;
  flex: 1;
`

export const Hamburger = function () {
  return (
    <StyledButton>
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
