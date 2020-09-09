import React, { useState } from "react"
import { render, fireEvent } from "@testing-library/react"
import { App } from "./App"
import { MemoryRouter, useHistory } from "react-router-dom"
import { MockedProvider, screen } from "@apollo/client/testing"

function setup() {
  return render(
    <MemoryRouter>
      <MockedProvider>
        <App />
      </MockedProvider>
    </MemoryRouter>
  )
}

describe.only("<App/>", () => {
  it("should route to root if cookie is not set", () => {
    const container = setup()
    expect(container.getAllByRole("heading")[1].textContent).toBe("Sign Up")
  })
})
