import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Input, Button } from "../../components"
import { useApolloClient, useMutation, gql } from "@apollo/client"
import { colors } from "../../styles/global"
import { useCookie } from "../../hooks"
import { useHistory } from "react-router-dom"
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "../../mutations/mutations"

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
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto 1rem;
  width: 100%;
`

const ErrorMessage = styled.p`
  color: ${colors.error};
  display: inline;
`

export function Login() {
  const client = useApolloClient()
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("error")
  const [password, setPassword] = useState("")
  const [isMember, setIsMember] = useState(false)
  const [cookie, setCookie] = useCookie("gardenbuilder-jwt-token", "")
  const history = useHistory()
  const [login, loginResults] = useMutation(SIGNIN_MUTATION, {
    onError(err) {
      console.log("an error ocurred on login")
      console.log(err)
    },
    onCompleted({ tokenAuth }) {
      setCookie(tokenAuth.token)
      client.writeQuery({
        query: gql`
          query GetUserCredentials {
            email
            password
            signedIn
          }
        `,
        data: {
          email,
          password,
          signedIn: true,
        },
      })
      history.push("/gardens")
      setIsMember(true)
    },
  })
  const [signup, signupResults] = useMutation(SIGNUP_MUTATION, {
    onError(err) {
      // console.log(err)
    },
  })

  useEffect(() => {
    if (loginResults.error) {
      console.log(loginResults.error.message)
      setErrorMessage("Unable to sign in")
    }
    if (signupResults.error) {
      ;/already exists/.test(signupResults.error.message) &&
        setErrorMessage("This user already exists! Please sign in instead")
    }
  }, [loginResults.error, signupResults.error])

  function submit(event) {
    event.preventDefault()
    if (isMember) {
      login({ variables: { email, password } })
    } else {
      signup({ variables: { email, password } })
    }
  }

  const buttonText = isMember ? "Sign In" : "Sign Up"

  return (
    <StyledForm onSubmit={submit}>
      <h2>{buttonText}</h2>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
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
