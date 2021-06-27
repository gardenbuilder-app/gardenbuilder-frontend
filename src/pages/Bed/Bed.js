import React from "react"
import { useLocation } from "react-router-dom"
import { gql } from '@apollo/client'
import apolloClient from "../../ApolloClient"
import { BedBuilder } from "./BedBuilder"


export function Bed() {
  const { state } = useLocation()
  const { bedName, bedId } = state
  const bed = getBedFromCache(bedId)

  return (
    <>
      <h2>{bedName}</h2>
      <BedBuilder bed/>
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
