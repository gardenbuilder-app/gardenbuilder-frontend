import React from "react"
import { render, screen } from "@testing-library/react"
import { BedList } from "./BedList"

describe("<BedList /> component", () => {
  beforeEach(() => {
  render(<BedList />)
  })

  it("renders mock beds", async () => {
    expect(await screen.findByText(/Mock Bed 0/i)).toBeInTheDocument();
    expect(await screen.findByText(/Mock Bed 1/i)).toBeInTheDocument();
  })
})
