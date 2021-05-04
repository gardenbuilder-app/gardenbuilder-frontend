import React, { useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Input } from "./Input"

function InputWrapper() {
  const [value, setValue] = useState("")
  return <Input name="input" value={value} setValue={setValue} />
}

describe("<Input /> component", () => {
  function setup() {
    const utils = render(<InputWrapper />)
    const input = utils.getByTestId("input")
    return {
      input,
      ...utils,
    }
  }

  it("should change passed value property", () => {
    const { input } = setup()
    expect(input.value).toBe("")
  })

  it("should change input that is passed to it", async () => {
    const { input } = setup()
    await userEvent.type(input, "test")
    expect(await screen.findByDisplayValue(/test/i)).toBeInTheDocument()
  })
})
