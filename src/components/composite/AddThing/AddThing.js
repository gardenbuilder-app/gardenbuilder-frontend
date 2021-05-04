import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { FaPlusCircle, FaChevronDown, FaChevronRight } from "react-icons/fa"
import { IconContext } from "react-icons"
import { Form, InputSection } from "components/composite"
import AddGardenStyles from "./AddThingStyles"

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export function AddThing({ thing, setThing, typeOfThing, executeGraphQL }) {
  const textInput = useRef(null)
  const [formVisible, setFormVisible] = useState(false)

  /* Add focus to the text input */
  useEffect(() => {
    // textInput.current.focus()
  })

  function onSubmit(event) {
    event.preventDefault()
    executeGraphQL()
    setThing("")
    textInput.current.focus()
  }

  return (
    <IconContext.Provider value={{ size: "1.5rem" }}>
      <AddGardenStyles>
        <ButtonContainer
          id="visible-toggler"
          onClick={() => setFormVisible(!formVisible)}
        >
          {!formVisible && (
            <FaChevronDown
              alt={`Add ${typeOfThing}`}
              aria-label={`Add ${typeOfThing}`}
              role="img"
            />
          )}
          {formVisible && (
            <FaChevronRight
              alt={`Add ${typeOfThing}`}
              aria-label={`Add ${typeOfThing}`}
              role="img"
            />
          )}
          &nbsp;Add {typeOfThing}
        </ButtonContainer>
        {formVisible && (
          <Form className="add-form" onSubmit={onSubmit}>
            <InputSection
              name={`${typeOfThing} Name`}
              id="name-input"
              ref={textInput}
              setValue={setThing}
              value={thing}
            />
            <button id="desktop-submit" name="submit" type="submit">
              Add
            </button>
            <button id="mobile-submit" name="submit" type="submit">
              <FaPlusCircle
                alt={`Add ${typeOfThing}`}
                aria-label={`Add ${typeOfThing}`}
                role="img"
              />
            </button>
          </Form>
        )}
      </AddGardenStyles>
    </IconContext.Provider>
  )
}
