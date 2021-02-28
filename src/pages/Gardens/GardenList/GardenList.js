import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import { GET_USER_GARDENS } from "queries"
import { useCurrentUser } from '../../../hooks'
import { Link } from "react-router-dom"

const GardenListWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  background: pink;
  margin: 0 auto;
`

export function GardenList() {
  const { data, loading, error } = useQuery(GET_USER_GARDENS)
  const loggedInUser = useCurrentUser();
  // console.log(loggedInUser, error)

  function getGardenElements(data) {
    console.log(data)
    return data.gardens.gardens.map((garden, index) => {
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
              state: { beds: garden.beds, gardenName: garden.name }
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

  const gardens = data?.gardens.gardens ? getGardenElements(data) : null

  if (loading) return <p>Loading...</p>
  if (error) {
    return <p>{error.message}</p>
  }
  if (!loading && !error && data) return <GardenListWrapper>{gardens}</GardenListWrapper>
}
