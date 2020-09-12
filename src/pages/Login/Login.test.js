import React, { useState } from "react"
import {
  render,
  fireEvent,
  screen,
  getByRole,
  getByTestId,
  waitFor,
} from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { Login, LOGIN_MUTATION, SIGNUP_MUTATION } from "./Login"

describe("<Login /> view", () => {
  const signupMock = {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: "test19@test.com",
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

  it("renders without error", async () => {
    render(
      <MockedProvider mocks={[signupMock]} addTypename={false}>
        <Login />
      </MockedProvider>
    )
  })

  it("shows Sign Up interface on login", () => {
    render(
      <MockedProvider mocks={[signupMock]} addTypename={false}>
        <Login />
      </MockedProvider>
    )
    expect(screen.getByRole("button").textContent).toBe("Sign Up")
  })

  it.skip("changes to login UI after createUser", async () => {
    const component = render(
      <MockedProvider mocks={[signupMock]} addTypename={false}>
        <Login />
      </MockedProvider>
    )

    // click
    const button = screen.getByRole("button")
    console.log(Object.keys(button))
    button.root.props.onClick()
    // screen.debug()
    // const tree = screen.toJSON()
    // expect(tree.children).toContain("Loading")
    expect(component).toBe(true)
  })

  // it.only("should include options to log in or sign up", () => {
  //   expect(getByText("Sign Up")).toBeInTheDocument
  //   // const { input } = setup()
  //   // expect(input.value).toBe("")
  // })

  // it("should switch to sign up view on click", () => {
  //   // const { input } = setup()
  //   // fireEvent.change(input, { target: { value: "test" } })
  //   // expect(input.value).toBe("test")
  // })
})
