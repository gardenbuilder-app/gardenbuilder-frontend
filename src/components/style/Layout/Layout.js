import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Header, Footer } from "components/composite"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Main = styled.main`
  flex-grow: 1;
`

const Layout = function ({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
}
export { Layout }
