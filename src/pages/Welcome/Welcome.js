import React from "react"
import { Link } from "react-router-dom"
import { Center } from "components/style"

export function Welcome() {
  return (
    <Center>
      <div>
        <h2>Welcome to Gardenbuilder</h2>
        <p>
          In order to get started, please <Link to="/gardens">make a garden</Link>
        </p>
      </div>
    </Center>
  )
}
