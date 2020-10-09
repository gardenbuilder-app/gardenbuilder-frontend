import { gql } from "@apollo/client"

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    deleteToken {
      deleted
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      user {
        id
        email
        password
      }
      token
    }
  }
`

export const CREATE_GARDEN_MUTATION = gql`
  mutation CREATE_GARDEN_MUTATION($name: String!) {
    createGarden(name: $name) {
      id
      name
    }
  }
`
