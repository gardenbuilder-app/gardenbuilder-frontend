import React from 'react'
import bedStyles from './beds.module.css'

function Beds () {
  const rowsAndColumns = (rows, columns) => ({
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  })
  return (
    <div
      className={bedStyles.grid}
      style={rowsAndColumns(2, 2)}
    >
      <div>one</div>
      <div>two</div>
      <div>three</div>
      <div>four</div>
    </div>
  )
}

export default Beds
