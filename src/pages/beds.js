import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/global'

function Beds () {
  const rows = 2
  const columns = 2

  const Grid = styled.div`
    display: grid;
    direction: row;
    gap: 2px;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
  `

  const GridItem = styled.div`
    background: ${colors.accent};
  `
  return (
    <Grid>
      <GridItem>one</GridItem>
      <GridItem>two</GridItem>
      <GridItem>three</GridItem>
      <GridItem>four</GridItem>
    </Grid>
  )
}

export default Beds
