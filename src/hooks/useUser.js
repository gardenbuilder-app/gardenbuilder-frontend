import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from 'queries'

function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  if (data) {
    return data.currentUser
  }
}

export { useUser }