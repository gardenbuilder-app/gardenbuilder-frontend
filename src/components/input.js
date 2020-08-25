import React, { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../styles/global'

const StyledInput = styled.input`
  font-family: inherit;
  font-size: 100%;
  height: 3rem;
  border: none;
  border-radius: 5px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
`

function Input ({ options }) {
  const [selectedInput, setSelectedInput] = useState('')

  /**
   * Event that's fired when input changes
   */
  function onChange (event) {
    const userInput = event.target.value

    // filter out suggestions that don't contain input
    const filteredOptions = options.filter(
      option =>
        option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    setSelectedInput(userInput)
  }

  return (
    <StyledInput
      type='text'
      onChange={onChange}
      //   onKeyDown={onKeyDown}
      value={selectedInput}
    />
  )
}

export default Input
