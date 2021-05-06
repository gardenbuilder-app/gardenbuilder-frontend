import React, { useState } from "react"
import PropTypes from "prop-types"

import BedMeasure from "./BedMeasure"
import BedGrid from "./BedGrid"
import "./BedBuilder.css"

const MAX_WIDTH = 20,
  MAX_LENGTH = 20

const BedBuilder = ({ length, width, unit }) => {
  const [measurements, setMeasurements] = useState({
    width,
    length,
    unit,
  })

  const handleBedSettings = (measurement) => {
    setMeasurements(measurement)
  }

  return (
    <div id="bed">
      <BedMeasure
        defaultSizes={{ width: measurements.width, length: measurements.length }}
        maxSizes={{ width: MAX_WIDTH, length: MAX_LENGTH }}
        units={["cm", "ft"]}
        defaultUnit={measurements.unit}
        onChange={handleBedSettings}
      />
      <BedGrid
        cols={measurements.width}
        rows={measurements.length}
        maxGridWidth={640}
        maxGridHeight={640}
      />
    </div>
  )
}

BedBuilder.propTypes = {
  length: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
}

export { BedBuilder }
