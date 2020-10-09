import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "../../ApolloClient"
import { Profile } from "./Profile"

describe("The <Profile /> page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApolloProvider client={client} addTypename={false}>
          <Profile />
        </ApolloProvider>
      </MemoryRouter>
    )
  })

  it("displays the Profile header", () => {
    expect(screen.getByText(/Profile/i)).toBeInTheDocument()
  })
})
