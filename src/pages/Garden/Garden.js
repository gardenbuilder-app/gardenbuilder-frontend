import React from "react"
import { useQuery } from '@apollo/client';
import { GET_USER_GARDENS} from 'queries'
import { BedList } from "./BedList"

export function Garden() {
  const { data, loading, error } = useQuery(GET_USER_GARDENS);
  if (loading) return <p>Loading...</p>
  if (error) return <div className="error">{error.message}</div>
  if (data) return (
    <div>
      <h2>Garden</h2>
      <BedList />
    </div>
  )
}
