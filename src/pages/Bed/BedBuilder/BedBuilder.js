import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"

import BedMeasure from "./BedMeasure"
import BedGrid from "./BedGrid"
import "./BedBuilder.css"

const MAX_WIDTH = 20,
  MAX_HEIGHT = 20

const BedBuilder = ({ height, width, unit }) => {
  const [measurements, setMeasurements] = useState({
    width,
    height,
    unit,
  })

  const handleBedSettings = useCallback((measurement) => {
    setMeasurements(measurement)
  })

  console.log(measurements.unit)

  return (
    <div id="bed">
      <BedMeasure
        defaultSizes={{ width: measurements.width, height: measurements.height }}
        maxSizes={{ width: MAX_WIDTH, height: MAX_HEIGHT }}
        units={["cm", "ft"]}
        defaultUnit={measurements.unit}
        onChange={handleBedSettings}
      />
      <BedGrid
        cols={measurements.width}
        rows={measurements.height}
        maxGridWidth={640}
        maxGridHeight={640}
      />
    </div>
  )
}

BedBuilder.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
}

export { BedBuilder }
