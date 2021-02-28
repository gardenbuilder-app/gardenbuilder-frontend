import React from "react"
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom'
import { GET_USER_GARDENS} from 'queries'
import { BedList } from "./BedList"

export function Garden(props) {
  const location = useLocation()
  const { data, loading, error } = useQuery(GET_USER_GARDENS);

  if (loading) return <p>Loading...</p>
  if (error) return <div className="error">{error.message}</div>
  // TODO: Add component to add bed
  if (data) return (
    <div>
      <h2>{ location.state.gardenName }</h2>
      <BedList beds={location.state.beds}/>
    </div>
  )
}
