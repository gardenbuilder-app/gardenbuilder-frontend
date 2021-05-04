import React from "react"
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import { graphql } from "msw"
import { server } from "mocks/server"
import { GardenList } from "./GardenList"
import client from "ApolloClient"

describe("<GardenList /> component", () => {
  const history = createMemoryHistory()

  // Mock push function
  history.push = jest.fn()

  const gardenListRender = (
    <ApolloProvider client={client} addTypename={false}>
      <Router history={history}>
        <GardenList />
      </Router>
    </ApolloProvider>
  )

  it("renders a loader while loading", () => {
    render(gardenListRender)
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("renders a list of gardens", async () => {
    render(gardenListRender)
    expect(
      await screen.findByRole("link", { name: /Garden One/i })
    ).toBeInTheDocument()
    expect(
      await screen.findByRole("link", { name: /Garden Two/i })
    ).toBeInTheDocument()
  })

  it("renders the number of beds in each garden", async () => {
    render(gardenListRender)
    expect(await screen.findByText(/0 beds/i)).toBeInTheDocument()
    expect(await screen.findByText(/2 beds/i)).toBeInTheDocument()
  })

  it("renders the isActive status of the garden", async () => {
    render(gardenListRender)
    expect(await screen.findByText("Active")).toBeInTheDocument()
    expect(await screen.findByText("Inactive")).toBeInTheDocument()
  })

  it("routes to a new route on click", async () => {
    const { getByText } = render(gardenListRender)
    expect(
      await screen.findByRole("link", { name: /Garden One/i })
    ).toBeInTheDocument()
    fireEvent.click(getByText("Garden One"))
    expect(history.push).toHaveBeenCalledTimes(1)
  })

  it("handles errors properly", async () => {
    server.use(
      graphql.query("GET_USER_GARDENS", (req, res, ctx) => {
        return res(
          ctx.errors([
            {
              status: 400,
              message: "Oops",
            },
          ])
        )
      })
    )
    render(gardenListRender)
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(await screen.findByText(/Oops/i)).toBeInTheDocument()
  })
})
