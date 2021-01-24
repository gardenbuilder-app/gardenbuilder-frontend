import React from "react"
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "../../ApolloClient"
import { Welcome } from "./Welcome"

describe("The <Welcome /> page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApolloProvider client={client} addTypename={false}>
          <Welcome />
        </ApolloProvider>
      </MemoryRouter>
    )
  })

  it("displays the Welcome header", async () => {
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
  })

})