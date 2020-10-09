import React from "react"
import { Navbar } from "./Navbar"
import { ProfileIcon } from "./ProfileIcon"
import useUser from "../../../hooks/useUser"

export const DesktopHeader = function () {
  const userLoggedIn = useUser()
  console.log(userLoggedIn)
  return (
    <>
      <h1>GardenBuilder</h1>
      {userLoggedIn && <ProfileIcon />}
      {userLoggedIn && <Navbar />}
    </>
  )
}
