import React from 'react'
import Navbar from './navbar'
import headerStyles from './header.module.css'
import Profile from '../views/profile'
import { FaBars } from 'react-icons/fa'
import useWindowSize from '../hooks/useWindowSize'

const Header = function () {
  const windowSize = useWindowSize()

  console.log(window)
  const headerContent = windowSize.width < 600 ? (
    <React.Fragment>
      <FaBars />
      <h1>
          GardenBuilder
      </h1>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <h1>
          GardenBuilder
      </h1>
      <Profile />
      <Navbar />
    </React.Fragment>
  )

  return (
    <header className={headerStyles.header}>
      { headerContent }
    </header>
  )
}

export default Header
