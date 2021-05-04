import React from "react"
import styled, { keyframes } from "styled-components"
import { colors } from "styles/global"
import { CloseModalButton } from "./CloseModalButton"

const showModalAnimation = keyframes`
    0% { display: none; opacity: 0; } 
    1% { display: flex; opacity: 0; }
    100% { opacity: .9; }
`

const StyledModal = styled.aside`
  animation: ${showModalAnimation} 0.37s ease;
  background-color: ${colors.black};
  color: ${colors.white};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  opacity: 0.925;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: calc(100vw - 2rem);
  z-index: 9999;
`

export function Modal({ children, closeModal }) {
  return (
    <StyledModal>
      {children}
      <CloseModalButton closeModal={closeModal} />
    </StyledModal>
  )
}
