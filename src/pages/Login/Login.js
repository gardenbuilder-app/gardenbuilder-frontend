import React, { useState } from "react"
import styled from "styled-components"
import { Input, Button } from "../../components"

const StyledForm = styled.form``

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <StyledForm>
      <label htmlFor="email">Email</label>
      <Input name="email" value={email} setValue={setEmail} />
      <label htmlFor="password">Password</label>
      <Input name="password" value={password} setValue={setPassword} />
      <Button name="submit" text="Submit" />
    </StyledForm>
  )
}
