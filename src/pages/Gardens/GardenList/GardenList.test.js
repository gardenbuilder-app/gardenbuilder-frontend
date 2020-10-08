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

  it("renders a list of gardens", async () => {
    expect(await screen.findByText(/Garden One/i)).toBeInTheDocument();
  })
})
