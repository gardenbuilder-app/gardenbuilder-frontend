import React from "react"
import { useQuery } from '@apollo/client';
import { useUrlParam } from '../../hooks'
// import { GET_USER_GARDENS} from 'queries'

export function Bed() {
  const bedName = useUrlParam('name')
  // const { data, loading, error } = useQuery(GET_USER_GARDENS);

  // if (loading) return <p>Loading...</p>
  // if (error) return <div className="error">{error.message}</div>
  // if (data) return (
  //   <div>
  //     <h2>{ gardenName }</h2>
  //     <BedList />
  //   </div>
  // )
  return (
    <div>
      <h2>{ bedName }</h2>
    </div>
  )
}
