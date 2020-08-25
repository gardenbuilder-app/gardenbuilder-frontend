import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../styles/global'
import { FaTimes } from 'react-icons/fa'

const showModalAnimation = keyframes`
    0% { display: none; opacity: 0; } 
    1% { display: flex; opacity: 0; }
    100% { opacity: .9; }
`

const StyledModal = styled.aside`
    animation: ${showModalAnimation} .37s ease;
    background-color: ${colors.black};
    color: ${colors.white};
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    opacity: .925;
    padding: 1rem;
    position: fixed;
    top: 0;
    width: calc(100vw - 2rem);
    z-index: 9999;
`

export default function Modal ({ children, closeModal }) {
  const StyledTimes = styled(FaTimes)`
    position: fixed;
    font-size: 200%;
    top: 2rem;
    right: 2rem;
    &:hover, :focus {
      color: ${colors.accent};
    }
  `

  return (
    <StyledModal>
      <StyledTimes onClick={closeModal} />
      { children }
    </StyledModal>
  )
}
