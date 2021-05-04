import React, { useRef, useLayoutEffect } from "react"

const BedGrid = ({ cols, rows, maxGridWidth, maxGridHeight }) => {
  const grid = useRef(0)

  useLayoutEffect(() => {
    grid.current.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`
    grid.current.style.maxWidth = maxGridWidth
    grid.current.style.maxHeight = maxGridHeight

    const cells = [].slice.call(document.getElementsByClassName("grid-cell"))
    cells.map((cell) => {
      let cellSize
      if (maxGridWidth / cols > maxGridHeight / rows) cellSize = maxGridHeight / rows
      else cellSize = maxGridWidth / cols

      if (cellSize > 120) cellSize = 120
      grid.current.style.width = cellSize * cols + "px"
      grid.current.style.height = cellSize * rows + "px"
      cell.style.height = cellSize - 2 + "px"
    })
  }, [cols, rows])

  const buildCells = () => {
    const cells = []
    const cellCount = cols * rows

    for (let i = 1; i <= cellCount; i++) {
      cells.push(<div key={i} className="grid-cell"></div>)
    }
    return cells
  }
  return (
    <div ref={grid} id="bed-grid">
      {buildCells()}
    </div>
  )
}

export default BedGrid
