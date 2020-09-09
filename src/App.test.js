import React, { useState } from "react"
import { render, fireEvent } from "@testing-library/react"
import { App } from "./App"
import useCookie from "./hooks"
import { MemoryRouter, useHistory } from "react-router-dom"
import { MockedProvider, screen } from "@apollo/client/testing"

describe.only("<App/>", () => {
  function setup() {
    return render(
      <MemoryRouter>
        <MockedProvider>
          <App />
        </MockedProvider>
      </MemoryRouter>
    )
  }

  it("should route to root if cookie is not set", () => {
    const container = setup()
    expect(container.getAllByRole("heading")[1].textContent).toBe("Sign Up")
  })

  it.only("should route to beds if cookie is set", () => {
    // To Do
    expect(true).toBe(true)
  })
})
