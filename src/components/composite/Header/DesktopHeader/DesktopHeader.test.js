import React from "react"
import { ApolloProvider } from "@apollo/client"
import { render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { graphql } from "msw"

import client from "ApolloClient"
import { DesktopHeader } from "./DesktopHeader"
import { server } from "mocks/server"

const HeaderRender = (
  <MemoryRouter>
    <ApolloProvider client={client} addTypename={false}>
      <DesktopHeader />
    </ApolloProvider>
  </MemoryRouter>
)

it("displays the App title", () => {
  render(HeaderRender)
  expect(screen.getByText(/GardenBuilder/i)).toBeInTheDocument()
})

it("renders the navbar with user signed in", async () => {
  render(HeaderRender)
  expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
  expect(await screen.findByText(/Gardens/i)).toBeInTheDocument()
  expect(await screen.findByRole("link", { name: /Gardens/i })).toBeInTheDocument()
  expect(await screen.findByRole("link", { name: /Beds/i })).toBeInTheDocument()
})

it("does not render the navbar with no signed in user", async () => {
  server.use(
    graphql.query("GET_CURRENT_USER", (req, res, ctx) => {
      return res(null)
    })
  )
  render(HeaderRender)
  expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
  await waitFor(() => {
    screen.queryByText(/Gardens/)
  })
  expect(
    await screen.queryByRole("link", { name: /Gardens/i })
  ).not.toBeInTheDocument()
})
