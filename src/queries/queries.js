import { gql } from "@apollo/client"

const GET_USER_GARDENS = gql`
  query {
    userGardens {
      id
      gardenName
    }
  }
`
