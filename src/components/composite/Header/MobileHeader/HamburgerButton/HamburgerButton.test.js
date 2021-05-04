import React from "react"
import { render } from "@testing-library/react"
import { HamburgerButton } from "./HamburgerButton"

const container = render(<HamburgerButton />)

it("contains an img with menu in the aria-name", () => {
  expect(container.getByRole("img", { name: /menu/gi })).toBeTruthy()
})
