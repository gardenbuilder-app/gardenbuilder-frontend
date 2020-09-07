import React, { useState } from "react"
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
`

/**
 * Input
 */
export function Input({ value, setValue, name }) {
  function onChange(event) {
    event.preventDefault()
    setValue(event.target.value)
  }

  return (
    <StyledInput
      data-testid="input"
      name={name}
      onChange={onChange}
      tabIndex="0"
      type="text"
      value={value}
    />
  )
}
