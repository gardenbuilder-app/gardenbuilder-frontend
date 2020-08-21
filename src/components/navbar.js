import React from 'react'
import navbarStyles from './navbar.module.css'

const Navbar = function () {
  return (
    <div className={navbarStyles.navList}>
      <h3
        className={navbarStyles.navItem}
        activeClassName={navbarStyles.activeNavItem}
        to='/beds'>
              Beds
      </h3>
      <div
        className={navbarStyles.navItem}
        activeClassName={navbarStyles.activeNavItem}
        to='/sections'>
              Sections
      </div>
      <div
        className={navbarStyles.navItem}
        activeClassName={navbarStyles.activeNavItem}
        to='/plants'>
              Plants
      </div>
    </div>
  )
}

export default Navbar
