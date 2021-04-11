import { gql } from "@apollo/client"

export const GET_USER_GARDENS = gql`
  query GET_USER_GARDENS {
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
  }
`

export const GET_USER_BEDS = gql`
  query GET_USER_BEDS($id: Int!) {
    beds(gardenId: $id) {
      id
      name
      isActive
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
