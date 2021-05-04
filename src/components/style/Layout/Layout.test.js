import React from "react"
import { screen, render } from "@testing-library/react"
import { Layout } from "./Layout"
import client from "ApolloClient"
import { ApolloProvider } from "@apollo/client"

describe("<Layout/>", () => {
  beforeEach(() => {
    render(
      <ApolloProvider client={client}>
        <Layout />)
      </ApolloProvider>
    )
  })

  it("renders properly", async () => {
    expect(
      await screen.findByRole("heading", { name: /GardenBuilder/i })
    ).toBeInTheDocument()
  })
})
