import React from "react"
import { gql, useQuery } from "@apollo/client"
import { GET_USER_GARDENS } from "../../queries/queries"

export function Gardens() {
  const { data, loading, error } = useQuery(GET_USER_GARDENS, {
    onError(err) {
      console.log(err)
    },
  })

  const gardenNames = data
    ? data.userGardens.map((garden, index) => (
        <div key={index}>{garden.gardenName}</div>
      ))
    : null

  return (
    <>
      <div>Gardens</div>
      {gardenNames}
    </>
  )
}
