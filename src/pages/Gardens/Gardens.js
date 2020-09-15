import React from "react"
import { gql, useQuery } from "@apollo/client"
import { GET_USER_GARDENS } from "./../../mutations"

export function Gardens() {
  const { data, loading, error } = useQuery(GET_USER_GARDENS, {
    onError(err) {
      console.log(err)
    },
  })

  return (
    <>
      <div>Gardens</div>
      {JSON.stringify(data, undefined, 2)}
    </>
  )
}
