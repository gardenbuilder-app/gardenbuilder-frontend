import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { graphql } from "msw"

import client from "../../../ApolloClient"
import { DesktopHeader } from "./DesktopHeader"
import { server } from "mocks/server"

describe("The <DesktopHeader /> component", () => {
  const HeaderRender = (
    <MemoryRouter>
      <ApolloProvider client={client} addTypename={false}>
        <DesktopHeader />
      </ApolloProvider>
    </MemoryRouter>
  )

  it("displays the App title", () => {
    render(HeaderRender);
    expect(screen.getByText(/GardenBuilder/i)).toBeInTheDocument()
  })

  it("renders the nav with user signed in", async () => {
    render(HeaderRender);
    expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
    expect(await screen.findByRole("link", { name: /Gardens/i })).toBeInTheDocument()
  })
  it("does not render the nav with no signed in user", async () => {
    server.use(
      graphql.query("CURRENT_USER_QUERY", (req, res, ctx) => {
        return res(null)
      })
    )
    render(HeaderRender)
    expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
    await waitFor(() => {
      screen.queryByText(/Gardens/)
    })
    expect(screen.queryByRole("link", { name: /Gardens/i })).not.toBeInTheDocument()
  })
})
