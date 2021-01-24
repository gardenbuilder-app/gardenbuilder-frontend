import React, { useState } from "react"
import styled from "styled-components"
import { colors } from "styles/global"
import { useWindowSize } from "hooks"
import { Modal } from "components/composite"
import PlantSelector from "./PlantSelector"

const Grid = styled.div`
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    ${(props) => props.itemWidth}
  );
  grid-template-rows: repeat(
    ${(props) => props.rows},
    ${(props) => props.itemWidth}
  );
  line-height: ${({ itemWidth }) => itemWidth};
  text-align: center;
  margin: 1rem auto;
  vertical-align: middle;
`

const GridItem = styled.button`
  background: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  margin: 0;
  text-decoration: none;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover,
  :focus {
    background: ${colors.accent};
  }
`
export function Beds() {
  const [modalActive, setModalActive] = useState(false)
  const { width } = useWindowSize()
  const rows = 4
  const columns = 5

  /* For mobile, width - 2rem - grid-gap */
  const gridWidth = width > 700 ? 600 : width - 32 - (columns - 1)

  const gridItemWidth = `${gridWidth / columns}px`

  /**
   * Create GridItem for each of row*column
   */
  const gridItems = []
  for (let i = 0; i < rows * columns; i++) {
    gridItems.push(<GridItem onClick={() => setModalActive(true)}>{i + 1}</GridItem>)
  }

  return (
    // <Modal closeModal={(event) => {
    //   setModalActive(false)
    // }}>
    //   <PlantSelector />
    // </Modal>
    modalActive ? (
      <Modal
        closeModal={(event) => {
          setModalActive(false)
        }}
      >
        <PlantSelector />
      </Modal>
    ) : (
      <Grid columns={columns} rows={rows} itemWidth={gridItemWidth}>
        {gridItems}
      </Grid>
    )
  )
}
