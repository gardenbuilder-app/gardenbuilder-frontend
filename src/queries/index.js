import { gql } from "@apollo/client"

export const GET_USER_GARDENS = gql`
  query GET_USER_GARDENS {
    gardens {
      gardens {
        id
        name
        beds {
          id
          name
          isActive
        }
        isActive
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
      user {
        id
        email
      }
      errors {
        message
      }
    }
  }
`
