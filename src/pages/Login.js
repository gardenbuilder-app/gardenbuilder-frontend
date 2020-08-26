import React from 'react'
import styled from 'styled-components'
import { InputWithOptions } from '../components'

const StyledForm = styled.form`

`

export function Login () {
  return (
    <StyledForm >
      <InputWithOptions />
    </StyledForm>
  )
}
