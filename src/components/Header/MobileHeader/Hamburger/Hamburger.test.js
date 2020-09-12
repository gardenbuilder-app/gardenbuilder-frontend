import React from "react"
import { Hamburger } from "./Hamburger"
import { render, fireEvent, screen, getByRole, within } from "@testing-library/react"

describe.only("The <Hamburger /> component", () => {
  const container = render(<Hamburger />)
  it("contains an img with menu in the aria-name", () => {
    expect(container.getByRole("img", { name: /menu/gi })).toBeTruthy()
  })
})
