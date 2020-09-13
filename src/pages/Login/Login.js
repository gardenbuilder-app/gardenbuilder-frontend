import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Input, Button } from "../../components"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { colors } from "../../styles/global"
import { useCookie } from "../../hooks"
import { useHistory } from "react-router-dom"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 350px;
`
const StyledSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
`
const InputSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 1rem;
  width: 100%;
`

const ErrorMessage = styled.p`
  color: ${colors.error};
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`

const SIGNUP_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      user {
        id
        email
        password
      }
    }
  }
`

function Login() {
  const client = useApolloClient()
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("")
  const [isMember, setIsMember] = useState(false)
  const [cookie, setCookie] = useCookie("gardenbuilder-jwt-token", "")
  const history = useHistory()
  const [login, loginResults] = useMutation(LOGIN_MUTATION, {
    onError(err) {
      console.log(err)
    },
    onCompleted({ tokenAuth }) {
      setCookie(tokenAuth.token)
      client.writeData({ data: { email, isLoggedIn: true, password } })
      history.push("/gardens")
      setIsMember(true)
    },
  })
  const [signup, signupResults] = useMutation(SIGNUP_MUTATION, {
    onError(err) {
      console.log(err)
    },
    onCompleted(results) {
      login({ variables: { email, password } })
    },
  })

  function submit(event) {
    event.preventDefault()
    if (isMember) {
      login({ variables: { email, password } })
    } else {
      signup({ variables: { email, password } })
    }
  }

  const buttonText = isMember ? "Sign In" : "Sign Up"

  if (loginResults.error) {
    setErrorMessage(loginResults.error.graphQLErrors[0].message)
  }
  if (signupResults.error) {
    setErrorMessage("This email is already registered")
  }
  if (errorMessage) return <ErrorMessage>{errorMessage}</ErrorMessage>

  return (
    <StyledForm onSubmit={submit}>
      <h2>{buttonText}</h2>
      <InputSection>
        <label htmlFor="email">Email</label>
        <Input name="email" value={email} setValue={setEmail} />
      </InputSection>
      <InputSection>
        <label htmlFor="password">Password</label>
        <Input name="password" value={password} setValue={setPassword} />
      </InputSection>
      <Button name="submit" text={buttonText} type="submit" />
      {isMember ? (
        <p>
          Not a member?{" "}
          <StyledSpan onClick={() => setIsMember(!isMember)}>Sign Up</StyledSpan>
        </p>
      ) : (
        <p>
          Already a member?{" "}
          <StyledSpan onClick={() => setIsMember(!isMember)}>Sign In</StyledSpan>
        </p>
      )}
    </StyledForm>
  )
}

export { Login, LOGIN_MUTATION, SIGNUP_MUTATION }
