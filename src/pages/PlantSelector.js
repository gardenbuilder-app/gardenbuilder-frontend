import React from 'react'
import Input from '../components/input'

function PlantSelector () {
  const plantChoices = [
    'Arugula', 'Green Beans', 'Spinach', 'Lettuce', ''
  ]

  return (
    <Input
      options={plantChoices}
    />
  )
}

export default PlantSelector
