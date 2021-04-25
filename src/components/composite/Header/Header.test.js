import React from "react"
import { render, screen, act } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import { MemoryRouter } from "react-router-dom"

import client from "ApolloClient"
import { Header } from "./Header"
import userEvent from "@testing-library/user-event"

export function resizeWindow() {
  return act(() => {
    global.innerWidth = 500
    global.dispatchEvent(new Event("resize"))
  })
}

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

  it("renders the Desktop Header with user logged in", async () => {
    expect(await screen.findByRole("link", { name: /Gardens/i })).toBeInTheDocument()
    expect(await screen.findByRole("link", { name: /Profile/i })).toBeInTheDocument()
    expect(screen.queryByLabelText(/hamburger menu/i)).not.toBeInTheDocument()
  })

  it("renders the Mobile Header an < 600px", async () => {
    resizeWindow()
    expect(await screen.findByLabelText(/hamburger menu/i)).toBeInTheDocument()
  })

  it("the hamburger button toggles the menu", async () => {
    resizeWindow()
    expect(await screen.findByLabelText(/hamburger menu/i)).toBeInTheDocument()
    expect(await screen.queryByText(/Gardens/i)).not.toBeInTheDocument()
    await userEvent.click(await screen.findByLabelText(/hamburger menu/i))
    expect(await screen.findByText(/Gardens/i)).toBeInTheDocument()
  })
})
