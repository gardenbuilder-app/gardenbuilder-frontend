import React, { useState } from "react"
import { render, fireEvent } from "@testing-library/react"
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

  it("should change input that is passed to it", () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: "test" } })
    expect(input.value).toBe("test")
  })
})
