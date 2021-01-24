import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import { Navbar } from "./Navbar"

/**
 * Each it block uses its own render method since
 * they have unique needs
 */
describe("The <DesktopHeader /> component", () => {
  /**
   * Currently only testing for Gardens, Profile, and Log Out
   * since it's unclear whether other items will remain in navbar
   * long-term.
   */
  it("should show Gardens, Profile, and Logout", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const menuItems = ["Profile", "Gardens", "Log Out"]
    for (const menuItem of menuItems) {
      const renderedItem = getByText(menuItem)
      expect(renderedItem).toBeInTheDocument()
    }
  })

  it("should reroute after clicking on Gardens or Profile", async () => {
    // mock history to spy on
    const history = createMemoryHistory()
    history.push = jest.fn()

    // render, adding history
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    )

    for (let link of ["Gardens", "Profile"]) {
      fireEvent.click(await screen.findByText(link))
      expect(history.push).toHaveBeenCalledWith(`/${link.toLowerCase()}`)
    }
  })
})
