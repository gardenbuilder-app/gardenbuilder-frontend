import React, { useState } from 'react'
import styled from 'styled-components'

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
export function InputWithOptions () {
  const [userInput, setUserInput] = useState(undefined)

  /**
   * Event that's fired when input changes
   */
  function onChange (event) {
    setUserInput(event.target.value)
  }

  return (
    <StyledInput
      type='text'
      onChange={onChange}
      value={userInput}
    />
  )
}
