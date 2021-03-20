import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import { GET_USER_GARDENS } from "queries"
import { Link } from "react-router-dom"

const GardenListWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  background: pink;
  margin: 0 auto;
`

export function GardenList({gardens}) {
  function getGardenElements(gardens) {
    return gardens.map((garden, index) => {
      const bedText =
        garden.beds.length !== 1
          ? garden.beds.length + " beds"
          : garden.beds.length + " bed"
      const isActive = garden.isActive ? "Active" : "Inactive"

      return (
        <React.Fragment key={index}>
          <Link
            to={{
              pathname: "/garden",
              hash: garden.id,
              state: { beds: garden.beds, gardenId: garden.id, gardenName: garden.name }
            }}
          >
          { garden.name }
          </Link>
          <div>{bedText}</div>
          <div>{isActive}</div>
        </React.Fragment>
      )
    })
  }

  const gardensUI = gardens ? getGardenElements(gardens) : null
  return <GardenListWrapper>{gardensUI}</GardenListWrapper>
}
