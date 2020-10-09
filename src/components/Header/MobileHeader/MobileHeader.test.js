import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { MobileHeader } from "./MobileHeader"
import { ApolloProvider } from "@apollo/client"
import client from 'ApolloClient'
import { MemoryRouter } from "react-router-dom"

describe("<MobileHeader /> component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
      <ApolloProvider client={client}>
        <MobileHeader />
      </ApolloProvider>
      </MemoryRouter>
    )
  })

  it('renders properly', async () => {
    expect(await screen.findByRole('heading', {name: /GardenBuilder/i})).toBeInTheDocument();
    expect(await screen.findByLabelText(/hamburger menu/i)).toBeInTheDocument();
  })
  

  it("should show Profile, Gardens, and Log Out in the menu after clicking the hamburger button", async () => {
    const button = await screen.findByLabelText(/hamburger menu/i)
    await userEvent.click(button)
    const menuItems = ["Profile", "Gardens", "Log Out"]
    for (const menuItem of menuItems) {
      const renderedItem = await screen.getByText(menuItem)
      expect(renderedItem).toBeInTheDocument()
    }
  })
})
