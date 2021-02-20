import { gql } from "@apollo/client"

export const GET_USER_GARDENS = gql`
  query {
    gardens {
      gardens {
        id
        name
        beds {
          id
          name
          isActive
        }
        endedAt
        isActive
        createdAt
        updatedAt
      }
      errors {
        message
      }
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
    }
  }
`
