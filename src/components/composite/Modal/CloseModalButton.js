import React from "react"
import styled from "styled-components"
import { colors } from "styles/global"
import { FaTimes } from "react-icons/fa"

/**
 * Include (but visually hide) text for accessibility reasons
 * will be visibile on focus
 */
const HiddenText = styled.div`
  color: white;
  &:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`

/**
 * Create and style a button
 */
const StyledButton = styled.button`
  background: none;
  border: none;
  color: ${colors.white};
  position: fixed;
  top: 2rem;
  right: 2rem;
  &:hover,
  :focus {
    color: ${colors.accent};
  }
`

export function CloseModalButton({ closeModal }) {
  const StyledTimes = styled(FaTimes)`
    font-size: 200%;
  `

  return (
    <StyledButton tabindex="0">
      <StyledTimes onClick={closeModal} />
      <HiddenText>Close Modal</HiddenText>
    </StyledButton>
  )
}
