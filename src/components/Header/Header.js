import React from "react"
import { MobileHeader } from "./MobileHeader"
import { DesktopHeader } from "./DesktopHeader"
import { useWindowSize } from "hooks"
import styled from "styled-components"
import { colors } from "styles/global"

const HeaderStyleProvider = styled.header`
  padding: 1rem;
  text-align: center;
  background: ${colors.primary};
`

export const Header = function () {
  const windowSize = useWindowSize()
  const header = windowSize.width < 600 ? <MobileHeader /> : <DesktopHeader />
  return <HeaderStyleProvider>{header}</HeaderStyleProvider>
}
