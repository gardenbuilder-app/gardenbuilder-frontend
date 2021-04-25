import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Button, Form, InputSection } from "components/composite"
import { useApolloClient, useMutation, gql } from "@apollo/client"
import { colors } from "styles/global"
import { setToken } from "libs"
import { useHistory } from "react-router-dom"
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "mutations"

const StyledSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const ErrorMessage = styled.p`
  color: ${colors.error};
  display: inline;
`

export function Login() {
  const client = useApolloClient()
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isMember, setIsMember] = useState(true)
  const history = useHistory()

  const [login, loginResults] = useMutation(SIGNIN_MUTATION, {
    onError(err) {
      console.log(`Error logging in: ${err}`)
    },
    onCompleted({ authenticateUser }) {
      if (authenticateUser.token) {
        setToken(authenticateUser.token)
        saveCredentialsInCache(email, password)
        history.push("/gardens")
      } else {
        const regex = new RegExp(/password/)
        const errorMessage =
          authenticateUser.errors[0].message ||
          authenticateUser?.token?.errors[0]?.message
        if (errorMessage && regex.test(errorMessage)) {
          setErrorMessage(errorMessage)
        }
      }
    },
  })

  const [signup, signupResults] = useMutation(SIGNUP_MUTATION, {
    onError(err) {
      console.log(err)
    },
    onCompleted({ createUser }) {
      const { token, errors } = createUser
      const graphqlError = errors ? errors[0].message : null
      if (token) {
        setToken(token)
        saveCredentialsInCache(email, password)
        history.push("/welcome")
      } else if (graphqlError) {
        setErrorMessage(graphqlError)
      } else {
        setErrorMessage("Token not returned from createUser mutation")
      }
    },
  })

  useEffect(() => {
    if (loginResults.error) {
      console.log(loginResults.error)
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
      signup({ variables: { email, password, firstName, lastName } })
    }
  }

  /**
   * Save email and password in Apollo cache
   * @param {string} email
   * @param {string} password
   */
  function saveCredentialsInCache(email, password) {
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
  }

  const buttonText = isMember ? "Sign In" : "Sign Up"

  return (
    <Form onSubmit={submit}>
      <h2>{buttonText}</h2>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      <InputSection name="email" value={email} setValue={setEmail} type="email" />
      <InputSection
        name="password"
        value={password}
        setValue={setPassword}
        type="password"
      />
      {!isMember && (
        <>
          <InputSection
            name="First Name"
            value={firstName}
            setValue={setFirstName}
            type="firstName"
          />
          <InputSection
            name="Last Name"
            value={lastName}
            setValue={setLastName}
            type="lastName"
          />
        </>
      )}
      <Button name="submit" text={buttonText} type="submit" />
      {isMember ? (
        <p>
          Not a member?{" "}
          <StyledSpan role="button" onClick={() => setIsMember(!isMember)}>
            Sign Up
          </StyledSpan>
        </p>
      ) : (
        <p>
          Already a member?{" "}
          <StyledSpan role="button" onClick={() => setIsMember(!isMember)}>
            Sign In
          </StyledSpan>
        </p>
      )}
    </Form>
  )
}
