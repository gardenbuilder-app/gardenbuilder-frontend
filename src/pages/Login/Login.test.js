import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import client from "../../ApolloClient"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { Login } from "./Login"

const mockHistoryPush = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe("<Login /> view", () => {
  // setup before each test
  let emailInput, passwordInput
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApolloProvider client={client} addTypename={false}>
          <Login />
        </ApolloProvider>
      </MemoryRouter>
    )
  })

  it("should include sign in and sign up text on initial screen", async () => {
    await waitFor(() => {
      expect(screen.getAllByText(/Sign Up/i).length).toBe(2)
      expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
    })
    //Previous test:
    // ;["Sign Up", "Sign In"].forEach(async (text) => {
    //   expect(await screen.findAllByText(text).length).toBeGreaterThan(0);
    // })
  })

  it("should be able to update email and password input fields", async () => {
    ;[emailInput, passwordInput] = ["email", "password"].map((name) => {
      return screen.getAllByRole("textbox", { name: name })[0]
    })
    ;[emailInput, passwordInput].forEach((input) => {
      userEvent.type(input, "testvalue")
      expect(input.value).toBe("testvalue")
    })
  })

  it("changes to sign in UI after clicking on sign in link", async () => {
    const link = screen.getByText("Sign In")
    userEvent.click(link)
    expect(
      await screen.findByRole("heading", { name: "Sign In" })
    ).toBeInTheDocument()
  })

  it("calls SIGNUP_MUTATION without error", async () => {
    // update email and password
    userEvent.type(emailInput, "test@test.com")
    userEvent.type(passwordInput, "testing!123")

    // fire button click and expect mutation fire on client
    const mutationFire = jest.spyOn(client, "mutate")
    const button = screen.getByRole("button", { name: "Sign Up" })
    userEvent.click(button)
    expect(mutationFire).toHaveBeenCalled()

    // // wait for ui change
    // await waitFor(() =>
    //   expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
    // )

    // expect(screen.children).toContain("Loading...")
  })

  it("reroutes to gardens page after signing up", async () => {
    // update email and password
    userEvent.type(emailInput, "test@test.com")
    userEvent.type(passwordInput, "testing!123")

    // fire button click and expect useHistory fire
    const button = screen.getByRole("button", { name: "Sign Up" })
    await userEvent.click(button)
    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it("calls SIGNIN_MUTATION without error", async () => {
    // toggle sign in ui
    const link = screen.getAllByText("Sign In")[0]
    fireEvent.click(link)

    // wait for ui change
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument()
    )

    // update email and password
    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "testing123!" } })

    // click button
    const button = await screen.findByRole("button", { name: "Sign In" })
    fireEvent.click(button[0])

    // wait for ui change
    await waitFor(
      () =>
        expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument()
      // expect(screen.getByRole("heading", { name: "Gardens" })).toBeInTheDocument()
    )
  })
})
