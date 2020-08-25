import React from 'react'
import styled from 'styled-components'
import Input from '../components/input'

const Form = styled.form`

`

function PlantSelector () {
  const plantChoices = [
    'Arugula', 'Green Beans', 'Spinach', 'Tomato', 'Tomatillo', 'Lettuce', ''
  ]

  return (
    <Form>
      <label>
      Plant Type
        <Input
          options={plantChoices}
        />
      </label>
    </Form>
  )
}

export default PlantSelector
