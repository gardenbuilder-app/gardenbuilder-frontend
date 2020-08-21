import React from 'react'
import Header from './header'
import Footer from './footer'
import layoutStyles from './layout.module.css'

const Layout = function ({ children }) {
  return (
    <div
      className={layoutStyles.container}
    >
      <div className={layoutStyles.content}>
        <Header/>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
