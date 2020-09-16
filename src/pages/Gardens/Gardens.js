import React from "react"
import { useQuery } from "@apollo/client"
import { GET_USER_GARDENS } from "../../queries/queries"

export function Gardens() {
  const { data } = useQuery(GET_USER_GARDENS)

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
