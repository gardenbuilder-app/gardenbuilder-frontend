import React from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import { MemoryRouter } from "react-router-dom"
import { graphql } from "msw"

import { server } from "mocks/server"
import { MobileHeader } from "./MobileHeader"
import client from "ApolloClient"

describe("<MobileHeader /> component", () => {
  const renderMobileHeader = (
    <MemoryRouter>
      <ApolloProvider client={client}>
        <MobileHeader />
      </ApolloProvider>
    </MemoryRouter>
  )

  it("renders properly", async () => {
    render(renderMobileHeader)
    expect(
      await screen.findByRole("heading", { name: /GardenBuilder/i })
    ).toBeInTheDocument()
  })

  it("does not render the hamburger button if not logged in", async () => {
    client.clearStore()
    server.use(
      graphql.query("CURRENT_USER_QUERY", (req, res, ctx) => {
        return res.once(null)
      })
    )
    render(renderMobileHeader)
    expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
    await waitFor(() => {
      screen.queryByLabelText(/hamburger menu/i)
    })
    expect(screen.queryByLabelText(/hamburger menu/i)).not.toBeInTheDocument()
  })

  it("renders the hamburger button if user logged in", async () => {
    render(renderMobileHeader)
    expect(await screen.findByLabelText(/hamburger menu/i)).toBeInTheDocument()
  })

  it("should show Profile, Gardens, and Log Out in the menu after clicking the hamburger button", async () => {
    render(renderMobileHeader)
    const button = await screen.findByLabelText(/hamburger menu/i)
    await fireEvent.click(button)
    const menuItems = ["Profile", "Gardens", "Log Out"]
    for (const menuItem of menuItems) {
      const renderedItem = await screen.getByText(menuItem)
      expect(renderedItem).toBeInTheDocument()
    }
  })
})
