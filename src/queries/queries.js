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
  query {
    userGardens {
      id
      gardenName
      beds {
        id
      }
      isActive
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
    }
  }
`;
