import React from "react"
import styled from "styled-components"
import { AddGarden } from "./AddGarden"
import { GardenList } from "."

const GardensWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

export function Gardens() {
  return (
    <GardensWrapper>
      <h2>Gardens</h2>
      <AddGarden />
      <GardenList />
    </GardensWrapper>
  )
}