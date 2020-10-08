import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import { GET_USER_GARDENS } from "../../../queries/queries"

const GardenListWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  background: pink;
  margin: 0 auto;
`

export function GardenList() {
  const { data, loading, error, updateQuery } = useQuery(GET_USER_GARDENS)

  function getGardenElements(data) {
    return data.userGardens.map((garden, index) => {
      const bedText =
        garden.beds.length !== 1
          ? garden.beds.length + " beds"
          : garden.beds.length + " bed"
      const isActive = garden.beds.isActive ? "Active" : "Inactive"

      return (
        <React.Fragment key={index}>
          <a href={`/garden?id=${garden.id}&name=${garden.gardenName}`}>
            {garden.gardenName}
          </a>
          <div>{bedText}</div>
          <div>{isActive}</div>
        </React.Fragment>
      )
    })
  }

  const gardens = data ? getGardenElements(data) : null
  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error)
    return <p>{error.message}</p>
  }
  if (!loading && !error && data) return <GardenListWrapper>{gardens}</GardenListWrapper>
}
