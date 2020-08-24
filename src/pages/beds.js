import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/global'
import useWindowSize from '../hooks/useWindowSize'

function Beds () {
  const { width } = useWindowSize()
  const rows = 2
  const columns = 3
  const gridWidth = width > 700 ? 600 : width - 12
  const gridItemWidth = `${gridWidth / columns}px`

  const Grid = styled.div`
    display: grid;
    gap: 2px;
    grid-template-columns: repeat(${columns}, ${gridItemWidth});
    grid-template-rows: repeat(${rows}, ${gridItemWidth});
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
      <GridItem>five</GridItem>
    </Grid>
  )
}

export default Beds
