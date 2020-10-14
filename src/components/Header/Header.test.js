import React from "react"
import { render, screen, act } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import { MemoryRouter } from "react-router-dom"

import client from "ApolloClient"
import { Header } from "./Header"

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
    expect(screen.queryByLabelText(/hamburger menu/i)).not.toBeInTheDocument();
  })

  it("renders the Mobile Header an < 600px", async () => {
    act(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
    })
    expect(await screen.findByLabelText(/hamburger menu/i)).toBeInTheDocument();
  })
})
