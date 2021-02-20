import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useMutation, gql } from "@apollo/client"
import { FaPlusCircle, FaChevronDown, FaChevronRight } from "react-icons/fa"
import { IconContext } from "react-icons"
import { Form, InputSection } from "components/composite"
import { CREATE_GARDEN_MUTATION } from "mutations"
import AddGardenStyles from "./AddGardenStyles"

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export function AddGarden() {
  const textInput = useRef(null)
  const [formVisible, setFormVisible] = useState(false)
  const [gardenName, setGardenName] = useState("")
  const [createGarden] = useMutation(CREATE_GARDEN_MUTATION, {
    update(cache, { data: { createGarden } }) {
      cache.modify({
        fields: {
          userGardens(existingGardens = []) {
            const newGardenRef = cache.writeFragment({
              data: createGarden,
              fragment: gql`
                fragment NewGarden on GardenType {
                  id
                  gardenName
                }
              `,
            })
            return [...existingGardens, newGardenRef]
          },
        },
      })
    },
    onError(err) {
      console.log(err)
    },
    onCompleted(data) {
      console.log('COMPLETED', data)
    },
  })

  /* Add focus to the text input */
  useEffect(() => {
    // textInput.current.focus()
  })

  function onSubmit(event) {
    event.preventDefault()
    createGarden({
      variables: { name: gardenName },
    })
    setGardenName("")
    textInput.current.focus()
  }

  return (
    <IconContext.Provider value={{ size: "1.5rem" }}>
      <AddGardenStyles>
        <ButtonContainer id="visible-toggler" onClick={() => setFormVisible(!formVisible)}>
          {!formVisible && <FaChevronDown alt="Add Garden" aria-label="Add Garden" role="img" />}
          {formVisible && <FaChevronRight alt="Add Garden" aria-label="Add Garden" role="img" />}
          &nbsp;Add Garden
        </ButtonContainer>
        {formVisible && (
          <Form className="add-form" onSubmit={onSubmit}>
            <InputSection
              name="Garden Name"
              id="name-input"
              ref={textInput}
              setValue={setGardenName}
              value={gardenName}
            />
            <button id="desktop-submit" name="submit" type="submit">
              Add
            </button>
            <button id="mobile-submit" name="submit" type="submit">
              <FaPlusCircle alt="Add Garden" aria-label="Add Garden" role="img" />
            </button>
          </Form>
        )}
      </AddGardenStyles>
    </IconContext.Provider>
  )
}