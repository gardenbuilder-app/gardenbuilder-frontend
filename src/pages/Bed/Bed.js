import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { SINGLE_BED_QUERY } from "queries"
import { UPDATE_BED_DIMENSIONS_MUTATION } from 'mutations'
import { useUrlHash } from "hooks"
import { BedBuilder } from "./BedBuilder"
import { Modal } from "components/composite"

export function Bed(props) {
  const [modalIsOpen, updateModalIsOpen] = useState(false)

  const id = Object.keys(useUrlHash())[0]

  const { data, loading, error } = useQuery(SINGLE_BED_QUERY, {
    variables: { id: parseInt(id) },
  })

  const [updateBedDimensions] = useMutation(UPDATE_BED_DIMENSIONS_MUTATION, {
    onError(err) {
      console.log(err)
    },
    onCompleted(data) {
      console.log("COMPLETED", data)
    },
  })

  const openModal = (section) => {
    console.log(section)
    updateModalIsOpen(!modalIsOpen)
    console.log(modalIsOpen)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  const { bed } = data

  const ModalWithPlantDetail = () => <Modal closeModal={() => updateModalIsOpen(!modalIsOpen)}>hi</Modal>

  return (
    <>
        { modalIsOpen && <ModalWithPlantDetail /> }
        <h2>Bed {`${id}`}</h2>
        <BedBuilder
          id={parseInt(id)}
          length={bed.length}
          width={bed.width}
          unit={bed.unitOfMeasurement}
          updateDimensions={updateBedDimensions}
          openModal={openModal}
        />
      </>
  )
}