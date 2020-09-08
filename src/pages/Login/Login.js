import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Input, Button } from "../../components"
import { gql, useMutation } from "@apollo/client"
import { colors } from "../../styles/global"

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
    createUser(email: $email, password: $password) {
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

/**
 * set up sign up
 * set up sign in
 * on signin, handle cookies
 * check for cookie on starting app, if cookie exists:
 *   a. set isMember = true
 *   b. skip Login component
 */

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isMember, setIsMember] = useState(false)
  const [login, signinData] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "all",
  })
  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION, {
    onError(err) {
      console.log(err)
    },
  })

  useEffect(() => {
    /**
     * If login data
     * set up cookie
     * move to next view
     */
    if (signinData.data) console.log(signinData.data)
    if (data) console.log("signed up", data)
  })

  function submit(event) {
    event.preventDefault()
    if (isMember) {
      console.log("logging in")
      login({ variables: { email, password } })
    } else {
      console.log("signing up")
      signup({ variables: { email, password } })
    }
  }

  // if (loading) return <div>loading</div>
  // if (error) return <div>error {error.message}</div>
  // if (!data) return <div>not found</div>
  const buttonText = isMember ? "Sign In" : "Sign Up"

  if (error)
    return <ErrorMessage>{JSON.stringify(error, undefined, 2)}</ErrorMessage>

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
