import React from "react"
import styled from "styled-components"

export function BedList() {
  // TODO: Graphql call to get list of beds

  const BedListWrapper = styled.ul`
    background-color: pink;
  `

  return (
    <BedListWrapper>
      <li>Mock Bed 0</li>
      <li>Mock Bed 1</li>
    </BedListWrapper>
  )
}
