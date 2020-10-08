import React, { useCallback, useState } from "react"
import BedMeasure from "./BedMeasure"
import BedGrid from "./BedGrid"

const MAX_WIDTH = 5,
  MAX_HEIGHT = 10,
  DEF_WIDTH = 3,
  DEF_HEIGHT = 5

const Bed = () => {
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
      <h3>Bed Builder</h3>
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

export default Bed
