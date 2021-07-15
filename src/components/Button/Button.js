import React from "react"
import styled from "styled-components"
import { colors } from "styles/global"

const StyledButton = styled.button`
  background-color: ${colors.accent};
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  font-family: inherit;
  font-size: 100%;
  height: 3rem;
  min-width: 100px;
  max-width: 264px;
`

/**
 * Button
 */
export function Button({ name, onClick, text, type }) {
  return (
    <StyledButton
      data-testid="button"
      name={name}
      onClick={onClick}
      tabIndex="0"
      type={type}
    >
      {text}
    </StyledButton>
  )
}
