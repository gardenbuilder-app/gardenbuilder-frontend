import React, { useState } from "react"
import PropTypes from "prop-types"

import BedMeasure from "./BedMeasure"
import BedGrid from "./BedGrid"
import "./BedBuilder.css"

const MAX_WIDTH = 20,
  MAX_LENGTH = 20

const BedBuilder = ({ id, length, width, unit, updateDimensions }) => {
  const [measurement, setMeasurement] = useState({
    width,
    length,
    unit,
  })

  const handleBedSettings = (measurement) => {
    setMeasurement(measurement)
    // mutate bed
    console.log('id is', id)
    console.log('width is', measurement.width)
    updateDimensions({
      variables: {
        input: {
          id: parseInt(id),
          width: parseInt(measurement.width),
          length: parseInt(measurement.length),
          unitOfMeasurement: measurement.unit
        }
      }
    })

  }

  return (
    <div id="bed" data-testid="bedbuilder">
      <BedMeasure
        defaultSizes={{ width: measurement.width, length: measurement.length }}
        maxSizes={{ width: MAX_WIDTH, length: MAX_LENGTH }}
        units={["cm", "ft"]}
        defaultUnit={measurement.unit}
        onChange={handleBedSettings}
      />
      <BedGrid
        cols={parseInt(measurement.width)}
        rows={parseInt(measurement.length)}
        maxGridWidth={640}
        maxGridHeight={640}
      />
    </div>
  )
}

BedBuilder.propTypes = {
  id: PropTypes.number,
  length: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
  updateDimensions: PropTypes.func
}

export { BedBuilder }
