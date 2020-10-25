import { gql } from "@apollo/client"

export const GET_USER_GARDENS = gql`
  query GET_USER_GARDENS {
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

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
    }
  }
`

export const SINGLE_GARDEN_QUERY = gql`
  query SINGLE_GARDEN_QUERY($id: Int!) {
    bedsForUser(gardenId: $id) {
      id
      length
      width
      name
      isActive
    }
  }
`
