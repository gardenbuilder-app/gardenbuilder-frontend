import React from "react"
import { Navbar } from "./Navbar"
import Profile from "../../../views/profile"
import styled from "styled-components"
import { colors } from "../../../styles/global"

export const DesktopHeader = function () {
  return (
    <>
      <h1>GardenBuilder</h1>
      <Profile />
      <Navbar />
    </>
  )
}
