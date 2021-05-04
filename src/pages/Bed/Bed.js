import React from "react"
import { useUrlParam } from "hooks"
import { BedBuilder } from "components/composite"

// import { GET_USER_GARDENS} from 'queries'

export function Bed() {
  const bedName = useUrlParam("name")

  return (
    <div>
      <h2>{bedName}</h2>
      <BedBuilder />
    </div>
  )
}
