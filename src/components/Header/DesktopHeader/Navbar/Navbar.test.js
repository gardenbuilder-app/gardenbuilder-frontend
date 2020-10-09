import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "../../../../ApolloClient"
import { Navbar } from "./Navbar"

describe("The <DesktopHeader /> component", () => {
  render(
    <MemoryRouter>
      <ApolloProvider client={client} addTypename={false}>
        <Navbar />
      </ApolloProvider>
    </MemoryRouter>
  )
  it("displays the App title", () => {
    expect(screen.getByText(/Gardenbuilder/i)).toBeInTheDocument()
  })
})
