import React from "react"
import { render } from "@testing-library/react"
import { GardenList } from "./GardenList"
import { ApolloProvider } from "@apollo/client/testing"
import client from '../../../ApolloClient'

describe.skip("<GardenList /> component", () => {
  render(
    <ApolloProvider client={client} addTypename={false}>
      <GardenList />
    </ApolloProvider>
  )

  it("has no tests yet", () => {
    console.warn("FAKE TEST WARNING: There are no tests here yet")
    expect("No tests yet").toBe("No tests yet")
  })
})
