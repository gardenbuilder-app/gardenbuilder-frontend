import React from "react"
import { useQuery } from "@apollo/client"

import { SINGLE_BED_QUERY } from "queries"
import { useUrlParam } from "hooks"
import { BedBuilder } from "./BedBuilder"

export function Bed() {
  const id = useUrlParam("id")

  const { data, loading, error } = useQuery(SINGLE_BED_QUERY, {
    variables: { id: parseInt(id) },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  const { bed } = data
  return (
    <>
      <h2>{data.bedName}</h2>
      <BedBuilder
        length={bed.length}
        width={bed.width}
        unit={bed.unitOfMeasurement}
      />
    </>
  )
}
