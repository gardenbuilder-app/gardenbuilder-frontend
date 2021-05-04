import { useQuery } from "@apollo/client"
import { GET_CURRENT_USER } from "queries"

function useCurrentUser() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER)

  if (!loading && !error) {
    const { currentUser } = data
    return currentUser
  }
}

export { useCurrentUser }
