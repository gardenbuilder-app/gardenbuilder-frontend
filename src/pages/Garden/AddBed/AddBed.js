import React, { useState, useRef } from "react"
import styled from "styled-components"
import { gql, useMutation } from "@apollo/client"
import { FaPlusCircle, FaChevronDown, FaChevronRight } from "react-icons/fa"

import { SINGLE_GARDEN_QUERY } from "queries"
import { Form, InputSection } from "components"
import { CREATE_BED_MUTATION } from 'mutations';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export function AddBed({ id }) {
  const { textInput } = useRef(null);
  const [ formVisible, setFormVisible ] = useState(false);
  const [ bedName, setBedName ] = useState('');
  const [ bedWidth, setBedWidth ] = useState('');
  const [ bedLength, setBedLength ] = useState('');

  const [createBed, { loading, error }] = useMutation(CREATE_BED_MUTATION, {
    refetchQueries: [{ query: SINGLE_GARDEN_QUERY, variables: {id}}],
    update(cache, { data: { createBed } }) {
      cache.modify({
        fields: {
          bedsForUser(existingBeds = []) {
            const newBedRef = cache.writeFragment({
              data: createBed,
              fragment: gql`
                fragment NewBed on BedType {
                  id
                  bedName
                }
              `,
            })
            return [...existingBeds, newBedRef]
          },
        },
      })
    },
    onError(err) {
      console.log(err)
    },
    onCompleted(data) {
      console.log(data)
    },
  })

  function onSubmit(event) {
    event.preventDefault()
    createBed({
      variables: { gardenId: id, name: bedName, width: bedWidth, length: bedLength },
    })
    setBedName("")
    setBedLength("")
    setBedWidth("")
    // textInput.current.focus()
  }

  return (
    <>
    <ButtonContainer id="visible-toggler" onClick={() => setFormVisible(!formVisible)}>
          {!formVisible && <FaChevronDown alt="Add Garden" aria-label="Add Garden" role="img" />}
          {formVisible && <FaChevronRight alt="Add Garden" aria-label="Add Garden" role="img" />}
          &nbsp;Add Bed
    </ButtonContainer>
    {formVisible && (
          <Form className="add-form" onSubmit={onSubmit}>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <InputSection
              name="Bed Name"
              type="text"
              id="name-input"
              ref={textInput}
              setValue={setBedName}
              value={bedName}
            />
            <InputSection
              name="Length"
              type="number"
              id="length-input"
              ref={textInput}
              setValue={setBedLength}
              value={bedLength}
            />
            <InputSection
              name="Width"
              type="number"
              id="width-input"
              ref={textInput}
              setValue={setBedWidth}
              value={bedWidth}
            />

            <button id="desktop-submit" name="submit" type="submit">
              Add
            </button>
            <button id="mobile-submit" name="submit" type="submit">
              <FaPlusCircle alt="Add Bed" aria-label="Add Bed" role="img" />
            </button>
          </Form>
        )}
    </>
  )
}
