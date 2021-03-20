import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { gql, useQuery, useMutation } from '@apollo/client'
import { AddThing } from "../../components/composite"
import { GardenList } from "."
import { CREATE_GARDEN_MUTATION } from "mutations"
import { GET_USER_GARDENS } from "queries"
import { useCurrentUser } from '../../hooks'

const GardensWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

export function Gardens() {
  //const loggedInUser = useCurrentUser();
  const [gardenName, setGardenName] = useState('')
  const { data, loading, error } = useQuery(GET_USER_GARDENS)
  // if (loading) return <p>Loading...</p>
  // if (error) {
  //   return <p>{error.message}</p>
  // }

  const gardens = data?.gardens.gardens

  function modifyCache(cache) {
      // cache.modify({
      //   fields: {
      //     userGardens(existingGardens = []) {
      //       const newGardenRef = cache.writeFragment({
      //         data: createGarden,
      //         fragment: gql`
      //           fragment NewGarden on GardenType {
      //             id
      //             gardenName
      //           }
      //         `,
      //       })
      //       return [...existingGardens, newGardenRef]
      //     },
      //   },
      // })
  }

  const [createGarden] = useMutation(CREATE_GARDEN_MUTATION, {
    update: (cache, { data: { createGarden } }) => {
      createGarden.garden.beds = Array(0)
      cache.writeQuery({ 
        query: GET_USER_GARDENS,
        data: {
          ...data,
          gardens: {
            gardens: [...data.gardens.gardens, createGarden.garden]
          }
        }
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
      variables: { name: gardenName }
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
      <GardenList gardens={gardens}/>
    </GardensWrapper>
  )
}