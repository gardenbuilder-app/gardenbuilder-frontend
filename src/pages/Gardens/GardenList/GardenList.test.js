import React from "react"
import { render, screen } from "@testing-library/react"
import { GardenList } from "./GardenList"
import { ApolloProvider } from "@apollo/client"
import client from 'ApolloClient'

describe("<GardenList /> component", () => {
  beforeEach(() => 
  render(
    <ApolloProvider client={client} addTypename={false}>
      <GardenList />
    </ApolloProvider>
  ))
  it("renders a loader while loading", () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })

  it("renders a list of gardens", async () => {
    expect(await screen.findByRole('link', {name: /Garden One/i})).toBeInTheDocument();
    expect(await screen.findByRole('link', {name: /Garden Two/i})).toBeInTheDocument();
  });

  it("renders the number of beds in each garden", async () => {
    expect(await screen.findByText(/0 beds/i)).toBeInTheDocument();
    expect(await screen.findByText(/2 beds/i)).toBeInTheDocument();
  });

  it("renders the isActive status of the garden", async () => {
    expect(await screen.findByText("Active")).toBeInTheDocument();
    expect(await screen.findByText(/Inactive/i)).toBeInTheDocument();
  })
});