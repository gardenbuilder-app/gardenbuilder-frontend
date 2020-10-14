import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { graphql } from 'msw';

import client from "../../../ApolloClient"
import { DesktopHeader } from "./DesktopHeader"
import { server } from 'mocks/server'


describe("The <DesktopHeader /> component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApolloProvider client={client} addTypename={false}>
          <DesktopHeader />
        </ApolloProvider>
      </MemoryRouter>
    )
  })
  
  it("does not render the nav with no signed in user", async () => {
    client.resetStore();
    server.resetHandlers();
    server.use(
      graphql.query("CURRENT_USER_QUERY", (req, res, ctx) => {
        return res(
          ctx.data({
            currentUser: {
              id: 'newid123'
            }
          })
        )
      })
    );
    expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
    expect(await screen.findByText(/Gardens/i)).toBeInTheDocument();
    screen.debug();
  })

  it("displays the App title", () => {
    expect(screen.getByText(/GardenBuilder/i)).toBeInTheDocument()
  })

  it("renders the nav with user signed in", async () => {
    expect(await screen.findByText(/GardenBuilder/i)).toBeInTheDocument()
    expect(await screen.findByRole("link", { name: /Gardens/i })).toBeInTheDocument()
  });

})
