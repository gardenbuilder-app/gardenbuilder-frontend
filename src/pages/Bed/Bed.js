import React from "react"
import { client, gql } from '@apollo/client'
import { useUrlParam } from "../../hooks"
import { BedBuilder } from "./BedBuilder"

export function Bed() {
  const bedName = useUrlParam("name")
  const id = useUrlParam("id") 


  return (
    <>
      <h2>{bedName}</h2>
      <BedBuilder />
    </>
  )
}
