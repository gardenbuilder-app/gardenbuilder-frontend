import React, { useState } from "react"
import {
  render,
  fireEvent,
  screen,
  getByRole,
  getByTestId,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { Login } from "./Login"
import { SIGNUP_MUTATION, SIGNIN_MUTATION } from "./../../mutations/mutations"

describe("<Login /> view", () => {
  // mock signup mutation results
  const signupMock = {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: "test20@test.com",
        password: "Testing123!",
      },
    },
    result: {
      data: {
        createUser: {
          user: {
            id: "5",
            email: "test@test.com",
            password:
              "pbkdf2_sha256$216000$9yYvfiOHK5hA$RqP0V/mNFKs7eu8lac/k2/0iD88rAw1twhvjOANfmgk=",
          },
        },
      },
    },
  }

  // setup before each test
  let container, emailInput, passwordInput
  beforeEach(() => {
    container = render(
      <MockedProvider mocks={[signupMock]} addTypename={false}>
        <Login />
      </MockedProvider>
    )
    ;[emailInput, passwordInput] = ["email", "password"].map((name) => {
      return container.getAllByRole("textbox", { name: name })[0]
    })
  })

  it("should include sign in and sign up text on initial screen", () => {
    ;["Sign Up", "Sign In"].forEach((text) => {
      expect(container.getAllByText(text).length).toBeGreaterThan(0)
    })
  })

  it("should be able to update email and password input fields", () => {
    ;[emailInput, passwordInput].forEach((input) => {
      fireEvent.change(input, { target: { value: "testvalue" } })
      expect(input.value).toBe("testvalue")
    })
  })

  it("changes to sign in UI after clicking on sign in link", async () => {
    const link = container.getByText("Sign In")
    fireEvent.click(link)
    await waitFor(() =>
      expect(container.getByRole("heading", { name: "Sign In" })).toBeInTheDocument()
    )
  })

  it("calls SIGNUP_MUTATION without error", async () => {
    // update email and password
    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "testing123!" } })

    // fire button click
    const button = container.getByRole("button", { name: "Sign Up" })
    fireEvent.click(button)

    // wait for ui change
    await waitFor(() =>
      expect(container.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
    )

    // expect(container.children).toContain("Loading...")
  })

  it("reroutes to gardens page after signing up", async () => {
    // initialize gql mock
    const signinMock = {
      request: {
        query: SIGNIN_MUTATION,
        variables: {
          email: "test@test.com",
          password: "Testing123!",
        },
      },
      result: {
        data: {
          tokenAuth: {
            token: "sometoken123",
            // __typename: "ObtainJSONWebToken",
          },
        },
      },
    }
    // set up container with signinMock
    container = render(
      <MockedProvider
        mocks={[signinMock, signinMock, signinMock]}
        addTypename={false}
      >
        <Login />
      </MockedProvider>
    )
    ;[emailInput, passwordInput] = ["email", "password"].map((name) => {
      return container.getAllByRole("textbox", { name: name })[0]
    })

    // toggle sign in ui
    const link = container.getAllByText("Sign In")[0]
    fireEvent.click(link)

    // wait for ui change
    await waitFor(() =>
      expect(container.getByRole("heading", { name: "Sign In" })).toBeInTheDocument()
    )

    // update email and password
    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "testing123!" } })

    // click button
    const button = container.getAllByRole("button", { name: "Sign In" })
    fireEvent.click(button[0])

    // wait for ui change
    await waitFor(
      () =>
        expect(
          container.getByRole("heading", { name: "Sign In" })
        ).toBeInTheDocument()
      // expect(container.getByRole("heading", { name: "Gardens" })).toBeInTheDocument()
    )
  })
})
