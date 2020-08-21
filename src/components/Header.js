import React from 'react'
import headerStyles from './header.module.css'

const Header = function () {
  return (
    <header className={headerStyles.header}>
      <h1>
          GardenBuilder
      </h1>
      <h3
        className={headerStyles.navList}
      >
        <div
          className={headerStyles.navItem}
          activeClassName={headerStyles.activeNavItem}
          to='/about'>
              Beds
        </div>
        <div
          className={headerStyles.navItem}
          activeClassName={headerStyles.activeNavItem}
          to='/products'>
              Sections
        </div>
        <div
          className={headerStyles.navItem}
          activeClassName={headerStyles.activeNavItem}
          to='/order'>
              Plants
        </div>
      </h3>
    </header>
  )
}

export default Header
