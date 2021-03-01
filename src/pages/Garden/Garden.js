import React, { useState } from "react"
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom'
import { GET_USER_GARDENS} from 'queries'
import { BedList } from "./BedList"
import { AddThing } from "../../components/composite"

export function Garden(props) {
  const [bed, updateBed] = useState('')
  const location = useLocation()
  const { data, loading, error } = useQuery(GET_USER_GARDENS);
  const [bedName, setBedName] = useState('')

  const [createBed] = useMutation(CREATE_BED_MUTATION, {
    // update(cache, { data: { createBed } }) {
    //   cache.modify({
    //     fields: {
    //       userBeds(existingBeds = []) {
    //         const newGardenRef = cache.writeFragment({
    //           data: createGarden,
    //           fragment: gql`
    //             fragment NewGarden on GardenType {
    //               id
    //               gardenName
    //             }
    //           `,
    //         })
    //         return [...existingGardens, newGardenRef]
    //       },
    //     },
    //   })
    // },
    onError(err) {
      console.log(err)
    },
    onCompleted(data) {
      console.log('COMPLETED', data)
    },
  })
  
  function executeGraphQL() {
    createBed({
      variables: { name: bedName },
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
