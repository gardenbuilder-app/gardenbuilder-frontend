import React, { useState } from "react"
import { render, fireEvent, screen, getByRole, within } from "@testing-library/react"
import { MobileHeader } from "./MobileHeader"

describe("<MobileHeader /> component", () => {
  const { getByText, getByRole } = render(<MobileHeader />)
  const button = getByRole("button", { name: /menu/gi })
  fireEvent.click(button)

  it("should show Profile, Gardens, and Log Out in the menu after clicking the hamburger button", async () => {
    const menuItems = ["Profile", "Gardens", "Log Out"]
    for (const menuItem of menuItems) {
      const renderedItem = await getByText(menuItem)
      expect(renderedItem).toBeInTheDocument()
    }
  })
})
