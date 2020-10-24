import React, { useState } from "react"
import styled from "styled-components"
import { gql, useMutation } from "@apollo/client"
import { FaPlusCircle, FaChevronDown, FaChevronRight } from "react-icons/fa"

const CREATE_BED_MUTATION = gql`
  mutation CREATE_BED_MUTATION(
    $gardenId: Int!
    $length: Int!
    $name: String!
    $notes: String
    $startDate: Date
    $width: Int!
  ) {
    createBed(
      gardenId: $gardenId
      length: $length
      name: $name
      notes: $notes
      startDate: $startDate
      width: $width
  ) {
    bed {
      gardenId
      length
      name
      notes
      startDate
      width
    }
  }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export function AddBed({ id }) {
  const [ formVisible, setFormVisible ] = useState(false);

  const [createBed, { loading, error }] = useMutation(CREATE_BED_MUTATION, {
    variables: { id },
  })

  return (
    <>
    <ButtonContainer id="visible-toggler" onClick={() => setFormVisible(!formVisible)}>
          {!formVisible && <FaChevronDown alt="Add Garden" aria-label="Add Garden" role="img" />}
          {formVisible && <FaChevronRight alt="Add Garden" aria-label="Add Garden" role="img" />}
          &nbsp;Add Garden
    </ButtonContainer>
    {formVisible && (
    <form action="POST">
      <input type="text" placeholder="sup" />
    </form>
    )}
    </>
  )
}
