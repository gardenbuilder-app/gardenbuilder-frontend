import React from "react"
import { render, waitFor, screen } from "@testing-library/react"
import { Logout } from "./Logout"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"

const mockHistoryPush = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe.only("<Logout /> component", () => {
  let container
  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    )
  })

  it("should render properly", () => {
    const logoutText = container.getByText("Log Out")
    expect(logoutText).toBeInTheDocument()
  })

  it("navigates to login page", async () => {
    suppressJSDomNavigateWarning()
    await userEvent.click(await screen.findByText(/Log Out/i))
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalled()
    })

    /**
     * Suppresses error warning that JSDom doesn't
     * include the react-router navigate method
     */
    function suppressJSDomNavigateWarning() {
      delete window.location
      window.location = { reload: mockHistoryPush }
    }
  })

  // it('clears user session', async () => {
  //   const eraseToken = jest.fn();
  //   const logout = await screen.findByText(/Log Out/i)
  //   await fireEvent.click(logout);
  //   await waitFor(() => {
  //     expect(eraseToken).toHaveBeenCalled();
  //   })
  // })
})
