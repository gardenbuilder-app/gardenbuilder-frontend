import React from "react"
import { useMutation, useQuery } from "@apollo/client"
import { SINGLE_BED_QUERY } from "queries"
import { UPDATE_BED_DIMENSIONS_MUTATION } from 'mutations'
import { useUrlHash } from "hooks"
import { BedBuilder } from "./BedBuilder"

export function Bed(props) {
  const id = Object.keys(useUrlHash())[0]

  const { data, loading, error } = useQuery(SINGLE_BED_QUERY, {
    variables: { id: parseInt(id) },
  })

  const [updateBedDimensions] = useMutation(UPDATE_BED_DIMENSIONS_MUTATION, {
    onError(err) {
      console.log(err)
    },
    onCompleted(data) {
      console.log("COMPLETED", data)
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  const { bed } = data

  return (
    <>
      <h2>Bed {`${id}`}</h2>
      <BedBuilder
        id={parseInt(id)}
        length={bed.length}
        width={bed.width}
        unit={bed.unitOfMeasurement}
        updateDimensions={updateBedDimensions}
      />
    </>
  )
}