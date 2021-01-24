import React, { useState } from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { Button } from "./Button"

function ButtonWrapper() {
  const [text, setText] = useState("initialText")
  return <Button name="input" text={text} onClick={() => setText("updatedText")} />
}

describe("<Button /> component", () => {
  beforeEach(() => {
    render(<ButtonWrapper />)
  })

  it("should show text that is passed to it", () => {
    expect(screen.getByText("initialText")).toBeInTheDocument()
  })

  it("should trigger the passed method onClick", () => {
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("updatedText")).toBeInTheDocument()
  })
})
