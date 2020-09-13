import React from "react"
import { render } from "@testing-library/react"
import { Gardens } from "./Gardens"

describe("<Gardens /> view", () => {
  it("renders its title", async () => {
    const { getByText } = render(<Gardens />)
    expect(getByText("Gardens")).toBeInTheDocument()
  })
})
