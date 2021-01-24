import React, { useRef, useCallback, memo } from "react"

const BedMeasure = ({ defaultSizes, maxSizes, units = [], defaultUnit, onChange }) => {
  const width = useRef(0)
  const height = useRef(0)
  const unit = useRef(0)

  const handleDataChanges = useCallback(() => {
    onChange({
      width: width.current.value,
      height: height.current.value,
      unit: unit.current.value,
    })
  })

  const buildSizes = (max, prefix) => {
    const els = []
    for (let i = 1; i <= max; i++) {
      els.push(
        <option key={prefix + "-" + i} value={i}>
          {i}
        </option>
      )
    }
    return els
  }

  return (
    <div id="bed-measure">
      <div>
        <label htmlFor="width">Width: </label>
        <select ref={width} name="width" onChange={handleDataChanges} value={defaultSizes.width}>
          {buildSizes(maxSizes.width, "w")}
        </select>
      </div>
      <div>
      <label htmlFor="height">Height: </label>
        <select ref={height} name="height" onChange={handleDataChanges} value={defaultSizes.height}>
          {buildSizes(maxSizes.height, "h")}
        </select>
      </div>
      <div>
      <label htmlFor="unit">Unit: </label>
        <select ref={unit} name="unit" onChange={handleDataChanges} value={defaultUnit}>
          {units.map((unit, index) => (
            <option key={"u-" + index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default memo(BedMeasure)
