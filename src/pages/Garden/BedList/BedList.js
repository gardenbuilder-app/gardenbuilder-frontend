import React, { useState } from "react"
import {useLocation, useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
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

export function BedList({beds}) {
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
