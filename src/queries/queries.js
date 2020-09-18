import { gql } from "@apollo/client"

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
