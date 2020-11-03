import { gql } from "@apollo/client"

// export const GET_USER_GARDENS = gql`
//   query GET_USER_GARDENS {
//     userGardens {
//       id
//       name
//       beds {
//         id
//       }
//       isActive
//     }
//   }
// `

// Updated query for typescript API
export const GET_USER_GARDENS = gql`
  query GARDENS {
    gardens {
      gardens {
        id
        name
        isActive
      }
      error {
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
      error {
        message
      }
    }
  }
`
