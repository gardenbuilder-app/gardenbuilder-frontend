import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_GARDEN_MUTATION } from "mutations"
import { GET_USER_GARDENS } from "queries"
import { AddThing } from "components/composite"

export function AddGarden() {
  const [gardenName, setGardenName] = useState("")

  const [createGarden] = useMutation(CREATE_GARDEN_MUTATION, {
    update: (cache, { data: { createGarden } }) => {
      const data = cache.readQuery({ query: GET_USER_GARDENS })
      createGarden.beds = Array(0)
      createGarden.isActive = true
      cache.writeQuery({
        query: GET_USER_GARDENS,
        data: {
          ...data,
          gardens: [...data.gardens, createGarden],
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
    createGarden({
      variables: { name: gardenName },
    })
  }

  return (
    <AddThing
      setThing={setGardenName}
      thing={gardenName}
      typeOfThing="Garden"
      executeGraphQL={executeGraphQL}
    />
  )
}
