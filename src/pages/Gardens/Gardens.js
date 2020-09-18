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
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  background: pink;
  margin: 0 auto;
`

const Garden = styled.a``

export function Gardens() {
  const { data } = useQuery(GET_USER_GARDENS)

  function getGardenElements(data) {
    return data.userGardens.map((garden, index) => {
      const gardenName = garden.gardenName
      const bedText =
        garden.beds.length !== 1
          ? garden.beds.length + " beds"
          : garden.beds.length + " bed"
      const isActive = garden.beds.isActive ? "Active" : "Inactive"

      return (
        <>
          <Garden key={index} href={`/garden?${garden.id}`}>
            {gardenName}
          </Garden>
          <div>{bedText}</div>
          <div>{isActive}</div>
        </>
      )
    })
  }

  const gardens = data ? getGardenElements(data) : null

  return (
    <GardensWrapper>
      <h2>Gardens</h2>
      <GardenDetail>{gardens}</GardenDetail>
    </GardensWrapper>
  )
}
