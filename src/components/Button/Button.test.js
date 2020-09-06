import React, { useState } from "react"
import { render, fireEvent, screen, getByRole, within } from "@testing-library/react"
import { Button } from "./Button"

function ButtonWrapper() {
  const [text, setText] = useState("initialText")
  return <Button name="input" text={text} onClick={() => setText("updatedText")} />
}

describe.only("<Button /> component", () => {
  function setup() {
    const { container } = render(<ButtonWrapper />)
    const button = container.querySelector("button")
    return button
  }

  it("should show text that is passed to it", () => {
    const button = setup()
    const { getByText } = within(button)
    expect(getByText("initialText")).toBeInTheDocument()
  })

  it("should trigger the passed method onClick", () => {
    const button = setup()
    fireEvent.click(button)
    const { getByText } = within(button)
    expect(getByText("updatedText")).toBeInTheDocument()
  })
})
