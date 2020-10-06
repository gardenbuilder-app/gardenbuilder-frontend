import React from "react"
import { useQuery } from '@apollo/client';
import { GET_USER_GARDENS} from '../../queries/queries'
import { BedList } from "./BedList"

export function Garden() {
  const { data, loading, error } = useQuery(GET_USER_GARDENS);
  if (loading) return <p>Loading...</p>
  if (error) return <div className="error">{error.message}</div>
  return (
    <div>
      <h2>Garden</h2>
      <h2>You have {data.userGardens.length} gardens</h2>
      <BedList />
    </div>
  )
}
