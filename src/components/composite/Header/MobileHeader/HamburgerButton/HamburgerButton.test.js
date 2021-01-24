import React from "react"
import { HamburgerButton } from "./HamburgerButton"
import { render, fireEvent, screen, getByRole, within } from "@testing-library/react"

describe.only("The <HamburgerButton /> component", () => {
  const container = render(<HamburgerButton />)
  it("contains an img with menu in the aria-name", () => {
    expect(container.getByRole("img", { name: /menu/gi })).toBeTruthy()
  })
})
