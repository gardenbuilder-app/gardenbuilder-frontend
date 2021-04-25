import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { graphql } from "msw"

import App from "App"
import { server } from "mocks/server"

describe("<App />", () => {
  it("renders properly with Gardens page with logged in user", async () => {
    render(<App />)
    expect(await screen.findByRole("link", { name: /Gardens/i })).toBeInTheDocument()
    expect(
      await screen.findByRole("heading", { name: /GardenBuilder/i })
    ).toBeInTheDocument()
  })

  it("redirects to Login page with no logged in user", async () => {
    server.use(
      graphql.query("CURRENT_USER_QUERY", (req, res, ctx) => {
        return res(null)
      })
    )
    render(<App />)
    expect(await screen.findAllByText(/Sign In/i)).toHaveLength(2)
  })
})
