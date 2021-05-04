import React, { useCallback, useState } from "react"
import BedMeasure from "./BedMeasure"
import BedGrid from "./BedGrid"
import "./BedBuilder.css"

const MAX_WIDTH = 20,
  MAX_HEIGHT = 20,
  DEF_WIDTH = 0,
  DEF_HEIGHT = 0

export const BedBuilder = () => {
  const [measurements, setMeasurements] = useState({
    width: DEF_WIDTH,
    height: DEF_HEIGHT,
    unit: "cm",
  })

  const handleBedSettings = useCallback((measurement) => {
    setMeasurements(measurement)
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
