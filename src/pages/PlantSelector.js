import React from "react"
import styled from "styled-components"
import { InputWithOptions } from "components/composite"

const Form = styled.form``

function PlantSelector() {
  const plantChoices = [
    "Arugula",
    "Green Beans",
    "Spinach",
    "Tomato",
    "Tomatillo",
    "Lettuce",
    "",
  ]

  return (
    <Form>
      <label>
        Plant Type
        <InputWithOptions options={plantChoices} />
      </label>
    </Form>
  )
}

export default PlantSelector
