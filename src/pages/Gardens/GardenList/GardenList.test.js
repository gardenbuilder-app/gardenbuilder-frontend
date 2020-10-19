import React from "react"
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import { graphql } from 'msw';

import { server } from 'mocks/server'
import { GardenList } from "./GardenList"
import client from 'ApolloClient'

describe("<GardenList /> component", () => {
  const gardenListRender = (
    <ApolloProvider client={client} addTypename={false}>
      <GardenList />
    </ApolloProvider>
  )
  it("renders a loader while loading", () => {
    render(gardenListRender)
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })

  it("renders a list of gardens", async () => {
    render(gardenListRender)
    expect(await screen.findByRole('link', {name: /Garden One/i})).toBeInTheDocument();
    expect(await screen.findByRole('link', {name: /Garden Two/i})).toBeInTheDocument();
  });

  it("renders the number of beds in each garden", async () => {
    render(gardenListRender)
    expect(await screen.findByText(/0 beds/i)).toBeInTheDocument();
    expect(await screen.findByText(/2 beds/i)).toBeInTheDocument();
  });

  it("renders the isActive status of the garden", async () => {
    render(gardenListRender)
    expect(await screen.findByText("Active")).toBeInTheDocument();
    expect(await screen.findByText(/Inactive/i)).toBeInTheDocument();
  })

  it('handles errors properly', async() => {
    server.use(
      graphql.query("GET_USER_GARDENS", (req, res, ctx) => {
        return res(
          ctx.errors([
            {
              status: 400,
              message: 'Oops'
            }
          ])
        )
      })
    );
    render(gardenListRender);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(await screen.findByText(/Oops/i)).toBeInTheDocument();
    screen.debug();
  })
});