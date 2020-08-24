import React from 'react'
import Navbar from './navbar'
import Profile from '../views/profile'
import { FaBars } from 'react-icons/fa'
import useWindowSize from '../hooks/useWindowSize'
import styled from 'styled-components'
import { colors } from '../styles/global'

const Header = styled.header`
    padding: 1rem 0;
    text-align: center;
    background: ${colors.primary};
    width: 100vw;
    margin-left: -1rem;
  `

const Headers = function () {
  const windowSize = useWindowSize()

  const header = windowSize.width < 600 ? (
    <Header>
      <FaBars />
      <h1>
          GardenBuilder
      </h1>
    </Header>
  ) : (
    <Header>
      <h1>
          GardenBuilder
      </h1>
      <Profile />
      <Navbar />
    </Header>
  )

  return header
}

export default Headers
