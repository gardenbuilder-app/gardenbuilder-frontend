import React from "react"
import { gql, useMutation, useQuery } from "@apollo/client"
import apolloClient from '../../ApolloClient'
import { SINGLE_BED_QUERY } from "queries"
import { UPDATE_BED_DIMENSIONS_MUTATION } from 'mutations'
import { useUrlHash } from "hooks"
import { BedBuilder } from "./BedBuilder"

export function Bed() {
  const id = Object.keys(useUrlHash())[0]
  console.log(id)

  const { data, loading, error } = useQuery(SINGLE_BED_QUERY, {
    variables: { id: parseInt(id) },
  })

  const [updateBedDimensions] = useMutation(UPDATE_BED_DIMENSIONS_MUTATION, {
    update: (cache, { data: { updateBedDimensions } }) => {
    //   console.log('dimensions updated')
    //   // const data = cache.readQuery({ query: GET_USER_GARDENS })
    //   // createGarden.beds = Array(0)
    //   // createGarden.isActive = true
    //   // cache.writeQuery({
    //   //   query: GET_USER_GARDENS,
    //   //   data: {
    //   //     ...data,
    //   //     gardens: [...data.gardens, createGarden],
    //   //   },
    //   // })
    },
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

function getBedFromCache(bedId) {
  return apolloClient.readFragment({
    id: `Bed:${bedId}`,
    fragment: gql`
      fragment MyBed on Bed {
        id
      }
    `,
  })
}
