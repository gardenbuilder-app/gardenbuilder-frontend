import React from "react"
import { render, waitFor, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "ApolloClient"
import userEvent from "@testing-library/user-event"
import { Logout } from "./Logout"
import * as libs from "libs"

const mockHistoryPush = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

jest.mock("libs", () => ({
  eraseToken: jest.fn(),
}))

<<<<<<< HEAD
describe.only("<Logout /> component", () => {
  let container
  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <ApolloProvider client={client}>
          <Logout />
        </ApolloProvider>
      </MemoryRouter>
    )
  })
=======
let container
beforeEach(() => {
  container = render(
    <MemoryRouter>
      <ApolloProvider client={client}>
        <Logout />
      </ApolloProvider>
    </MemoryRouter>
  )
})

it("should render properly", () => {
  const logoutText = container.getByText("Log Out")
  expect(logoutText).toBeInTheDocument()
})
>>>>>>> 1fb4c7234da75f1bddbbe525a58a0affe91baf7d

it("navigates to login page", async () => {
  suppressJSDomNavigateWarning()
  await userEvent.click(await screen.findByText(/Log Out/i))
  await waitFor(() => {
    expect(mockHistoryPush).toHaveBeenCalled()
    expect(mockHistoryPush).toHaveBeenCalledWith("/login")
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

<<<<<<< HEAD
  it("clears user session", async () => {
    const mockEraseToken = libs.eraseToken
    const logout = await screen.findByText(/Log Out/i)
    await fireEvent.click(logout)
    await waitFor(() => {
      expect(mockEraseToken).toHaveBeenCalled()
    })
=======
it("clears user session", async () => {
  const mockEraseToken = libs.eraseToken
  const logout = await screen.findByText(/Log Out/i)
  await fireEvent.click(logout)
  await waitFor(() => {
    expect(mockEraseToken).toHaveBeenCalled()
>>>>>>> 1fb4c7234da75f1bddbbe525a58a0affe91baf7d
  })
})
