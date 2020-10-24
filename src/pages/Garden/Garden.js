import React from "react"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import styled from 'styled-components';

import { AddBed } from './AddBed/'
import { BedList } from "./BedList"

const SINGLE_GARDEN_QUERY = gql`
  query SINGLE_GARDEN_QUERY($id: Int!) {
    bedsForUser(gardenId: $id) {
      id
      name
      isActive
    }
  }
`

const GardenStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Garden() {
  //extract garden id from url
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get("id")
  const name = urlParams.get("name")

  //query the garden & its beds via
  const { data, loading, error } = useQuery(SINGLE_GARDEN_QUERY, {
    variables: { id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <div className="error">{error.message}</div>
  console.log(data)
  if (data)
    return (
      <GardenStyles>
        <h2>Garden: {name}</h2>
        <AddBed id={id}/>
        <BedList />
      </GardenStyles>
    )
}
