import { gql } from "@apollo/client"

export const SIGNIN_MUTATION = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNUP_MUTATION = gql`
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
