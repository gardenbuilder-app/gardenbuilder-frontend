import React from "react"
import { useUrlParam } from "hooks"
import { BedBuilder } from "./BedBuilder"

export function Bed() {
  const bedName = useUrlParam("name")

  return (
    <>
      <h2>{bedName}</h2>
      <BedBuilder />
    </>
  )
}
