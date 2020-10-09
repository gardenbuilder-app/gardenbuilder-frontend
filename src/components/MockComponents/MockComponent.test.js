import React from "react"
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import client from "ApolloClient"
import userEvent from "@testing-library/user-event"
import MockComponent from "./MockComponent"
import { server } from "mocks/server"

beforeEach(() => server.listen())
afterAll(() => server.close())

describe("<MockComponent/>", () => {
  beforeEach(() => {
    render(
      <ApolloProvider client={client}>
        <MockComponent />
      </ApolloProvider>
    )
  })
  it("renders properly", async () => {
    expect(await screen.findByRole("button", { name: /Sup/i })).toBeInTheDocument()
  })
  it("renders a loader while loading", () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })
  it("retrieves and renders data", async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(
      await screen.findByRole("heading", { name: /abc123/i })
    ).toBeInTheDocument()
  })
  it("calls MOCK_MUTATION on button click", async () => {
    const makeThingMock = jest.spyOn(client, "mutate")
    const supButton = await screen.findByRole("button", { name: /Sup/i })
    await userEvent.click(supButton)
    expect(makeThingMock).toHaveBeenCalled()
  })
})
