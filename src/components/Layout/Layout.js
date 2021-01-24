import React from "react"
import styled from "styled-components"
import { Header } from "../"
import { Footer } from "../"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Main = styled.main`
  flex-grow: 1;
`

export const Layout = function ({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
