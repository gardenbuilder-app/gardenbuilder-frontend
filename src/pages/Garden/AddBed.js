import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { AddThing } from "components/composite"
import { CREATE_BED_MUTATION } from "mutations"
import PropTypes from "prop-types"

function AddBed({ gardenId }) {
  const [bedName, setBedName] = useState("")

  const [createBed] = useMutation(CREATE_BED_MUTATION, {
    update(cache, { data: { createBed } }) {
      cache.modify({
        fields: {
          userBeds(existingBeds = []) {
            const newBedRef = cache.writeFragment({
              data: createBed,
              fragment: gql`
                fragment NewBed on BedType {
                  id
                  name
                  length
                  width
                  unitOfMeasurement
                }
              `,
            })
            return [...existingBeds, newBedRef]
          },
        },
      })
    },
    onError(err) {
      console.log(err)
    },
    onCompleted(data) {
      console.log("COMPLETED", data)
    },
  })

  function executeGraphQL() {
    createBed({
      variables: { name: bedName, gardenId: parseInt(gardenId) },
    })
  }

  return (
    <AddThing
      thing={bedName}
      setThing={setBedName}
      typeOfThing="Bed"
      executeGraphQL={executeGraphQL}
    />
  )
}

AddBed.propTypes = {
  gardenId: PropTypes.string,
}

export { AddBed }
