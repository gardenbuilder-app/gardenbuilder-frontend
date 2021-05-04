import React from "react"
import { render, screen } from "@testing-library/react"

import { Footer } from "./Footer"

describe("<Footer />", () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it("renders correctly", async () => {
    expect(await screen.findByText(/Footer here/i)).toBeInTheDocument()
  })
})
