import React, { useState } from "react"
import styled from "styled-components"
import { useUrlParam } from '../../../hooks'

const BedListWrapper = styled.ul`
  background-color: pink;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  background: pink;
  margin: 0 auto;
`

export function BedList() {
  const gardenName = useUrlParam('name')
  const [beds, updateBeds] = useState([
    {id: 1, name: 'Square Herb Bed'},
    {id: 2, name: 'Eastern Vegetable Bed 1'},
    {id: 3, name: 'Eastern Vegetable Bed 2'},
    {id: 4, name: 'Eastern Vegetable Bed 3'},
    {id: 5, name: 'Eastern Vegetable Bed 4'},
    {id: 5, name: 'Long Vegetable Bed'},
  ])
  
  // TODO: Graphql call to get list of beds
  return (
    <BedListWrapper>
      {beds.map(bed => 
        <a href={`/bed?id=${bed.id}&name=${bed.name}`}>
          {bed.name}
        </a>
      )}
    </BedListWrapper>
    
  )
}
