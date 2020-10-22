import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from 'queries'

function useCurrentUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (!loading && !error) {
    const { currentUser } = data;
    return currentUser
  }
}

export { useCurrentUser }