import React from 'react'
import Navbar from './Navbar'
import Profile from '../../views/profile'
import { FaBars } from 'react-icons/fa'
import useWindowSize from '../../hooks/useWindowSize'
import styled from 'styled-components'
import { colors } from '../../styles/global'

const StyledHeader = styled.header`
    padding: 1rem 0;
    text-align: center;
    background: ${colors.primary};
    width: 100vw;
    margin-left: -1rem;
  `

export const Header = function () {
  const windowSize = useWindowSize()

  const header = windowSize.width < 600 ? (
    <StyledHeader>
      <FaBars />
      <h1>
          GardenBuilder
      </h1>
    </StyledHeader>
  ) : (
    <StyledHeader>
      <h1>
          GardenBuilder
      </h1>
      <Profile />
      <Navbar />
    </StyledHeader>
  )

  return header
}
