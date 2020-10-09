import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { MobileHeader } from "./MobileHeader"
import { ApolloProvider } from "@apollo/client"
import client from 'ApolloClient'

describe("<MobileHeader /> component", () => {
  render(
    <ApolloProvider client={client}>
      <MobileHeader />
    </ApolloProvider>
  )
  

  it("should show Profile, Gardens, and Log Out in the menu after clicking the hamburger button", async () => {
    await waitFor(() => {
      expect(screen.getByRole("button", {name: /menu/i})).toBeInTheDocument();
    })
    const button = await screen.findByRole("button", { name: /menu/gi })
    fireEvent.click(button)
    const menuItems = ["Profile", "Gardens", "Log Out"]
    for (const menuItem of menuItems) {
      const renderedItem = await screen.getByText(menuItem)
      expect(renderedItem).toBeInTheDocument()
    }
  })
})
