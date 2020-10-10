import React from "react"
import { render, screen } from "@testing-library/react"
import App from "App"
import * as libs from 'libs'

//mock only getToken() from libs
jest.mock('libs', () => ({
  ...jest.requireActual('libs'),
  getToken: jest.fn()
}))

describe("<App />", () => {
  beforeEach(() => {
    render(
        <App />
    )
  })
  it("renders properly", async () => {
    expect(
      await screen.findByRole("heading", { name: /GardenBuilder/i })
    ).toBeInTheDocument()
  })

  it("renders the gardens page when logged in", async () => {
    expect(
      await screen.findAllByText(/Sign In/i)
    ).toHaveLength(2)
  })

  it("calls getToken()", () => {
    const mockGetToken = libs.getToken
    expect(mockGetToken).toHaveBeenCalled();
  })
})
