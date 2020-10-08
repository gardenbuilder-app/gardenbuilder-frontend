import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import client from '../../ApolloClient';
import { Gardens } from "./Gardens"

describe("<Gardens /> view", () => {
  /**
   *  Set up conditions for each test.
   *  We must rerender before each new assertion
   */
  beforeEach(() => {
    render(
      <ApolloProvider client={client} addTypename={false}>
        <Gardens />
      </ApolloProvider>
    )
  })

  it("renders its title", async () => {
    expect(await screen.findByText("Gardens")).toBeInTheDocument()
  })

  // it.only("renders garden names from graphql query", async () => {
  //   screen.debug()
  //   await waitFor(() => expect(getAllByText(/Garden \w/)).toHaveLength(2))
  // })
})
