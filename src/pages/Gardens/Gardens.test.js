import React from "react"
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ApolloProvider } from "@apollo/client"
import client from "ApolloClient"
import { Gardens } from "./Gardens"

describe("<Gardens /> Page", () => {
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

  it("renders the AddGarden component", async () => {
    expect(await screen.findByText(/Add Garden/i)).toBeInTheDocument()
  })
})
