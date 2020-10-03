import React from "react"
import { Navbar } from "./Navbar"
import Profile from "./Profile"
import useUser from '../../../hooks/useUser';

export const DesktopHeader = function () {
  const me = useUser()
  return (
    <>
      <h1>GardenBuilder</h1>
      {me && <Profile />}
      {me && <Navbar />}
    </>
  )
}
