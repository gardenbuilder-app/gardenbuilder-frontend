import React, { useState } from "react"
import { gql, useMutation, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom'
import { GET_USER_GARDENS} from 'queries'
import { CREATE_BED_MUTATION } from '../../mutations'
import { BedList } from "./BedList"
import { AddThing } from "../../components/composite"

export function Garden(props) {
  const location = useLocation()
  const { data, loading, error } = useQuery(GET_USER_GARDENS);
  const [bedName, setBedName] = useState('')

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
      console.log('COMPLETED', data)
    },
  })
  
  function executeGraphQL() {
    createBed({
      variables: { name: bedName, gardenId: parseInt(location.state.gardenId) }
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <div className="error">{error.message}</div>
  if (data) return (
    <div>
      <h2>{ location.state.gardenName }</h2>
      <AddThing
        thing={bedName}
        setThing={setBedName}
        typeOfThing="Bed"
        executeGraphQL={executeGraphQL}
      />
      <BedList beds={location.state.beds}/>
    </div>
  )
}
