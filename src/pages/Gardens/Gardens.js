import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import { GET_USER_GARDENS } from "../../queries/queries"

const GardensWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const GardenDetail = styled.div`
  background: pink;
  width: max-content;
  margin: 0 auto;
`

const Garden = styled.a`
  margin-bottom: 1rem;
`

export function Gardens() {
  const { data } = useQuery(GET_USER_GARDENS)

  const gardenNames = data
    ? data.userGardens.map((garden, index) => (
        <Garden key={index} href="">
          {garden.gardenName}
        </Garden>
      ))
    : null

  return (
    <GardensWrapper>
      <h2>Gardens</h2>
      <GardenDetail>{gardenNames}</GardenDetail>
    </GardensWrapper>
  )
}
