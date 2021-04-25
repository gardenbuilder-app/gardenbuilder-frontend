import React from "react"
import { render, screen } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import { BedList } from "./BedList"
import client from "ApolloClient"

describe("<BedList /> component", () => {
  beforeEach(() => {
    render(
      <ApolloProvider client={client} addTypename={false}>
        <BedList gardenId={1} />
      </ApolloProvider>
    )
  })

  it("renders mock beds", async () => {
    ;["Bed One", "Bed Two"].forEach(async (string) => {
      expect(await screen.findByText(string)).toBeInTheDocument()
    })
  })
})
