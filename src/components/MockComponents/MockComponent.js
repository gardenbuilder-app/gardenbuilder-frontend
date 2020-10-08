import React from "react"
import { useQuery, useMutation, gql } from "@apollo/client"

const MOCK_QUERY = gql`
  query MOCK_QUERY {
    fake {
      id
    }
  }
`

const MOCK_MUTATION = gql`
  mutation MOCK_MUTATION($id: String) {
    makeThing(id: $id) {
      id
    }
  }
`

const MockComponent = () => {
  const { data, loading, error } = useQuery(MOCK_QUERY)
  const [makeThing] = useMutation(MOCK_MUTATION, { variables: { id: "abc123" } })
  const handleClick = async (e) => {
    e.preventDefault()
    const res = await makeThing()
  }
  if (loading) return <p>Loading...</p>
  if (error) return <div className="error">{error.message}</div>
  return (
    <>
      {data && <h1>{data.fake.id}</h1>}
      <button onClick={handleClick}>Sup</button>
    </>
  )
}

export default MockComponent
