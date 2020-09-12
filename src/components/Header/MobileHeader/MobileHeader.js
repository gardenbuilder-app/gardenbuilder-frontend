import React from "react"
import { Hamburger } from "./Hamburger"
import styled from "styled-components"
import { colors } from "../../../styles/global"

const MobileHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`

export const MobileHeader = function () {
  return (
    <MobileHeaderStyle>
      <h1>GardenBuilder</h1>
      <Hamburger />
    </MobileHeaderStyle>
  )
}
