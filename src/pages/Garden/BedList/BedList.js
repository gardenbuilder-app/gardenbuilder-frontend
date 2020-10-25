import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"

import { SINGLE_GARDEN_QUERY } from 'queries';

const BedListWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  background: pink;
  margin: 0 auto;
`

export function BedList({ id }) {
  const { data, loading, error } = useQuery(SINGLE_GARDEN_QUERY, {
    variables: {id}
  })

  function getGardenElements(data) {
    return data.bedsForUser.map((bed, index) => {
      const lengthText =
        bed.length !== 1
          ? bed.length + " feet long"
          : bed.length + " foot long"
      
      const widthText =
        bed.width !== 1
          ? bed.width + " feet wide"
          : bed.width + " foot wide"
      
      const isActive = bed.isActive ? "Active" : "Inactive"

      return (
        <React.Fragment key={index}>
          <a href={`/bed?id=${bed.id}&name=${bed.name}`}>
            {bed.name}
          </a>
          <div>{lengthText}</div>
          <div>{widthText}</div>
          <div>{isActive}</div>
        </React.Fragment>
      )
    })
  }

  const gardens = data ? getGardenElements(data) : null
  if (loading) return <p>Loading...</p>
  if (error) {
    return <p>{error.message}</p>
  }
  if (!loading && !error && data) return <BedListWrapper>{gardens}</BedListWrapper>
}
