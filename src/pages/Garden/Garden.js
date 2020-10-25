import React from "react"
import styled from 'styled-components';

import { AddBed } from './AddBed/'
import { BedList } from "./BedList"

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

    return (
      <GardenStyles>
        <h2>Garden: {name}</h2>
        <AddBed id={id}/>
        <BedList id={id}/>
      </GardenStyles>
    )
}
