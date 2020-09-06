import React, { useState } from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  font-family: inherit;
  font-size: 100%;
  height: 3rem;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  padding: 0 0 0 1rem;
`

/**
 * Button
 */
export function Button({ name, onClick, text }) {
  return (
    <StyledButton data-testid="button" name={name} onClick={onClick} tabIndex="0">
      {text}
    </StyledButton>
  )
}
