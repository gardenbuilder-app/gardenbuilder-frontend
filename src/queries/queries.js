import { gql } from "@apollo/client"

// export const GET_USER_GARDENS = gql`
//   query {
//     userGardens {
//       id
//       gardenName
//     }
//   }
// `

export const GET_USER_GARDENS = gql`
  query GET_USER_GARDENS {
    userGardens {
      id
      name
      beds {
        id
        isActive
      }
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
    }
  }
`;
