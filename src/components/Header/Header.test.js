import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import { MemoryRouter } from "react-router-dom"
import { graphql } from 'msw';

import client from "ApolloClient"
import { Header } from "./Header"
import {server } from "mocks/server"

describe("<Header />", () => {
  beforeEach(() => {
    render(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ApolloProvider>
    )
  })

  it("renders the title", async () => {
    expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
  })

  it("renders the nav with user logged in", async () => {
    expect(await screen.findByRole("link", { name: /Gardens/i })).toBeInTheDocument()
    expect(await screen.findByRole("link", { name: /Profile/i })).toBeInTheDocument()
  })
})
