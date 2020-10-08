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
      name
      beds {
        id
      }
      isActive
    }
  }
`
