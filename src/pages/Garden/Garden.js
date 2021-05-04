import React from "react"
import { useLocation } from "react-router-dom"
import { AddBed, BedList } from "."

export function Garden(props) {
  const location = useLocation()

  return (
    <div>
      <h2>{location.state.gardenName}</h2>
      <AddBed gardenId={location.state.gardenId} />
      <BedList gardenId={location.state.gardenId} />
    </div>
  )
}
