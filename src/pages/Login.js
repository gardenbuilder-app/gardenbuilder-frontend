import React from "react"
import styled from "styled-components"
import { Input } from "../components"

const StyledForm = styled.form``

export function Login() {
  return (
    <StyledForm>
      <label htmlFor="email">Email</label>
      <Input name="email" />
      <label htmlFor="password">Password</label>
      <Input name="password" />
    </StyledForm>
  )
}
