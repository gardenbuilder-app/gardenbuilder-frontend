import React, { useState } from "react"
import styled from "styled-components"
import { gql, useMutation } from '@apollo/client'
import { AddThing } from "../../components/composite"
import { GardenList } from "."
import { CREATE_GARDEN_MUTATION } from "mutations"

const GardensWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

export function Gardens() {
  const [gardenName, setGardenName] = useState('')

  const [createGarden] = useMutation(CREATE_GARDEN_MUTATION, {
    update(cache, { data: { createGarden } }) {
      cache.modify({
        fields: {
          userGardens(existingGardens = []) {
            const newGardenRef = cache.writeFragment({
              data: createGarden,
              fragment: gql`
                fragment NewGarden on GardenType {
                  id
                  gardenName
                }
              `,
            })
            return [...existingGardens, newGardenRef]
          },
        },
      })
    },
    onError(err) {
      console.log(err)
    },
    onCompleted(data) {
      console.log('COMPLETED', data)
    },
  })

  function executeGraphQL() {
    createGarden({
      variables: { name: gardenName },
    })
  }

  return (
    <GardensWrapper>
      <h2>Gardens</h2>
      <AddThing
        setThing={setGardenName}
        thing={gardenName}
        typeOfThing="Garden" 
        executeGraphQL={executeGraphQL}
      />
      <GardenList />
    </GardensWrapper>
  )
}