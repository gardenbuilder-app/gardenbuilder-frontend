import React, { useRef, memo } from "react"
import PropTypes from "prop-types"

const BedMeasure = ({
  defaultSizes,
  maxSizes,
  units = [],
  defaultUnit,
  onChange,
}) => {
  const width = useRef(0)
  const length = useRef(0)
  const unit = useRef(0)

  const handleDataChanges = () => {
    onChange({
      width: width.current.value,
      length: length.current.value,
      unit: unit.current.value,
    })
  }

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
        <select
          ref={width}
          name="width"
          onChange={handleDataChanges}
          value={defaultSizes.width}
        >
          {buildSizes(maxSizes.width, "w")}
        </select>
      </div>
      <div>
        <label htmlFor="length">Length: </label>
        <select
          ref={length}
          name="length"
          onChange={handleDataChanges}
          value={defaultSizes.length}
        >
          {buildSizes(maxSizes.length, "h")}
        </select>
      </div>
      <div>
        <label htmlFor="unit">Unit: </label>
        <select
          ref={unit}
          name="unit"
          onChange={handleDataChanges}
          value={defaultUnit}
        >
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

BedMeasure.propTypes = {
  defaultSizes: PropTypes.object,
  maxSizes: PropTypes.object,
  units: PropTypes.array,
  defaultUnit: PropTypes.string,
  onChange: PropTypes.func,
}

export default memo(BedMeasure)
