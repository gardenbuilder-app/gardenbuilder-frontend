import React from "react"
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "ApolloClient"
import { Profile } from "./Profile"

describe("<Profile />", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApolloProvider client={client} addTypename={false}>
          <Profile />
        </ApolloProvider>
      </MemoryRouter>
    )
  })

  it("displays the Profile header", async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
    expect(screen.getByText(/Profile/i)).toBeInTheDocument()
  })

  it("displays the user's email", async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument()
  })
})
