import React from "react"
import styled from "styled-components"

const StyledInput = styled.input`
  font-family: inherit;
  font-size: 100%;
  height: 3rem;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  padding: 0 0 0 1rem;
  width: 100%;
`

/**
 * Input
 */
export const Input = React.forwardRef(({ value, setValue, name, type }, ref) => {
  function onChange(event) {
    event.preventDefault()
    setValue(event.target.value)
  }

  return (
    <StyledInput
      aria-label={name}
      data-testid="input"
      name={name}
      onChange={onChange}
      role="textbox"
      ref={ref}
      tabIndex="0"
      type={type ? type : "text"}
      value={value}
    />
  )
})
