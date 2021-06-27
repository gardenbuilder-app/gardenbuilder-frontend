import React, { useCallback, useState } from "react"
import BedMeasure from "./BedMeasure"
import BedGrid from "./BedGrid"
import "./BedBuilder.css"

const MAX_WIDTH = 20,
  MAX_HEIGHT = 20

export const BedBuilder = ({bed}) => {
  const [measurements, setMeasurements] = useState({
    width: bed.width || 0,
    height: bed.height || 0,
    unit: bed.unitOfMeasurement || "cm",
  })

  const handleBedSettings = useCallback((measurement) => {
    setMeasurements(measurement)
    // TODO: update bed in apollo
  })

  return (
    <div id="bed">
      <BedMeasure
        defaultSizes={{ width: measurements.width, height: measurements.height }}
        maxSizes={{ width: MAX_WIDTH, height: MAX_HEIGHT }}
        units={["cm", "feet"]}
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

