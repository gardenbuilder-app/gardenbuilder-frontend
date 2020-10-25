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
    deleteRefreshToken {
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

export const CREATE_BED_MUTATION = gql`
  mutation CREATE_BED_MUTATION(
    $gardenId: Int!
    $length: Int!
    $name: String!
    $notes: String
    $startDate: Date
    $width: Int!
  ) {
    createBed(
      gardenId: $gardenId
      length: $length
      name: $name
      notes: $notes
      startDate: $startDate
      width: $width
  ) {
      length
      name
      notes
      startDate
      width
    }
  }
`
