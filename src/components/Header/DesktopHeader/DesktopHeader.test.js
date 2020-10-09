import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "../../../ApolloClient"
import { DesktopHeader } from "./DesktopHeader"

describe("The <DesktopHeader /> component", () => {
  render(
    <MemoryRouter>
      <ApolloProvider client={client} addTypename={false}>
        <DesktopHeader />
      </ApolloProvider>
    </MemoryRouter>
  )
  it("displays the App title", () => {
    expect(screen.getByText(/Gardenbuilder/i)).toBeInTheDocument()
  })
})
