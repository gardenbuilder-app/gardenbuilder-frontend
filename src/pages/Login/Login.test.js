import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { spy } from "sinon"

import client from "ApolloClient"
import { Login } from "./Login"
import { SIGNUP_MUTATION } from "mutations"
import { SIGNIN_MUTATION } from "mutations"

//Mock useHistory.push
const mockHistoryPush = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe("<Login /> view", () => {
  // setup before each test
  let emailInput, passwordInput, firstNameInput, lastNameInput

  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApolloProvider client={client} addTypename={false}>
          <Login />
        </ApolloProvider>
      </MemoryRouter>
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should include sign in and sign up text on initial screen", async () => {
    await waitFor(() => {
      expect(screen.getAllByText(/Sign In/i).length).toBe(2)
      expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
    })
  })

  it("should be able to update email and password input fields", async () => {
    //select fields
    ;[emailInput, passwordInput] = ["email", "password"].map((name) => {
      return screen.getAllByRole("textbox", { name: name })[0]
    })

    //type in fields
    ;[emailInput, passwordInput].forEach((input) => {
      userEvent.type(input, "testvalue")
      expect(input.value).toBe("testvalue")
    })
  })

  it("changes to sign up UI after clicking on sign in link", async () => {
    //Click Sign Up link to toggle UI
    const link = screen.getByText("Sign Up")
    userEvent.click(link)
    expect(
      await screen.findByRole("heading", { name: "Sign Up" })
    ).toBeInTheDocument()
  })

  it("calls SIGNIN_MUTATION without error", async () => {
    //select inputs
    ;[emailInput, passwordInput] = ["email", "password"].map((name) => {
      return screen.getAllByRole("textbox", { name: name })[0]
    })
    // update email and password
    await userEvent.type(emailInput, "test@test.com")
    await userEvent.type(passwordInput, "testing!123")

    //spy on client mutations
    spy(client, "mutate")

    // fire button click
    const button = screen.getByRole("button", { name: "Sign In" })
    userEvent.click(button)

    //assert that mutation is called
    expect(client.mutate.getCall(0).args[0].mutation).toEqual(SIGNIN_MUTATION)
    //with proper variables
    expect(client.mutate.getCall(0).args[0].variables).toEqual({
      email: "test@test.com",
      password: "testing!123",
    })
    //reset
    client.mutate.restore()
  })

  it("reroutes to gardens page after signing in", async () => {
    //find inputs
    ;[emailInput, passwordInput] = ["email", "password"].map((name) => {
      return screen.getAllByRole("textbox", { name: name })[0]
    })
    // type email and password
    await userEvent.type(emailInput, "test@test.com")
    await userEvent.type(passwordInput, "testing!123")

    //fire button click
    const button = screen.getByRole("button", { name: "Sign In" })
    await fireEvent.click(button)

    //assert redirect is called
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledTimes(2)
      expect(mockHistoryPush).toHaveBeenCalledWith("/gardens")
    })
  })

  it("calls SIGNUP_MUTATION without error", async () => {
    // toggle sign in ui
    const link = screen.getAllByText("Sign Up")[0]
    fireEvent.click(link)

    // wait for ui change
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument()
    )

    //set inputs
    ;[emailInput, passwordInput, firstNameInput, lastNameInput] = [
      "email",
      "password",
      "First Name",
      "Last Name",
    ].map((name) => {
      return screen.getAllByRole("textbox", { name: name })[0]
    })

    // update email and password
    userEvent.type(emailInput, "test@test.com")
    userEvent.type(passwordInput, "testing!123")
    userEvent.type(firstNameInput, "Fake")
    userEvent.type(lastNameInput, "Name")

    // click button
    spy(client, "mutate")
    const button = await screen.findByRole("button", { name: "Sign Up" })
    userEvent.click(button)

    //assert SIGNUP_MUTATION called, with proper variables, and reset
    expect(client.mutate.getCall(0).args[0].mutation).toEqual(SIGNUP_MUTATION)
    expect(client.mutate.getCall(0).args[0].variables).toEqual({
      email: "test@test.com",
      password: "testing!123",
      firstName: "Fake",
      lastName: "Name",
    })

    //reset
    client.mutate.restore()
  })

  it("redirects to the welcome page after signup", async () => {
    // toggle sign in ui
    const link = screen.getAllByText("Sign Up")[0]
    fireEvent.click(link)

    // wait for ui change
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument()
    )

    //set inputs
    ;[emailInput, passwordInput, firstNameInput, lastNameInput] = [
      "email",
      "password",
      "First Name",
      "Last Name",
    ].map((name) => {
      return screen.getAllByRole("textbox", { name: name })[0]
    })

    // update email and password
    userEvent.type(emailInput, "test@test.com")
    userEvent.type(passwordInput, "testing!123")
    userEvent.type(firstNameInput, "Fake")
    userEvent.type(lastNameInput, "Name")

    // click button
    const button = await screen.findByRole("button", { name: "Sign Up" })
    fireEvent.click(button)

    //assert that redirect is called
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledTimes(2)
      expect(mockHistoryPush).toHaveBeenCalledWith("/welcome")
    })
  })
})
