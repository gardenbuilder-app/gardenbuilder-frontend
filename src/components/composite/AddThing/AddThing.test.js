import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import userEvent from "@testing-library/user-event"
import { spy } from "sinon"
import client from "ApolloClient"
import { AddThing } from "./AddThing"
import { CREATE_GARDEN_MUTATION } from "mutations"

describe("<AddThing/>", () => {
  const mockSetThing = jest.fn((word) => word)
  const mockExecuteGraphQL = jest.fn((word) => word)

  beforeEach(() => {
    render(
      <ApolloProvider client={client}>
        <AddThing
          setThing={mockSetThing}
          thing="A thing"
          typeOfThing="Generic Thing"
          executeGraphQL={mockExecuteGraphQL}
        />
      </ApolloProvider>
    )
  })

  it("renders title correctly", async () => {
    expect(await screen.findByText("Add Generic Thing")).toBeInTheDocument()
  })

  it("toggles the Add Garden form on click", async () => {
    //toggle form visibility
    const toggler = await screen.findByText(/Add Generic Thing/i)
    await userEvent.click(toggler)

    //assert form visible/open
    expect(await screen.findByText(/Generic Thing Name/i)).toBeInTheDocument()

    //toggle closed
    await userEvent.click(toggler)

    //assert closed
    await waitFor(() => {
      expect(screen.queryByText(/Generic Thing Name/i)).toBeNull()
    })
  })

  it("changes the value of the input upon typing", async () => {
    //toggle form open
    const toggler = await screen.findByText(/Add Generic Thing/i)
    await userEvent.click(toggler)

    //type in input
    const input = await screen.findByRole("textbox")
    const inputValue = "some inputvalue"
    await userEvent.type(input, inputValue)

    //assert setThing called
    expect(mockSetThing.mock.calls.length).toBe(inputValue.length)
    expect(mockSetThing.mock.calls[0][0]).toContain(inputValue[0])
  })

  it("fires mockExecuteGraphQL on button click", async () => {
    //toggle form open
    const toggler = await screen.findByText(/Add Generic Thing/i)
    await userEvent.click(toggler)

    //type in input
    const input = await screen.findByRole("textbox")
    const inputValue = "some inputvalue"
    await userEvent.type(input, inputValue)

    // //assert value change
    // //spy on client mutations
    // spy(client, 'mutate')

    //click 'Add' button
    const button = await screen.findByRole("button", { name: /Add/i })
    await userEvent.click(button)

    //assert executeGraphql called
    expect(mockExecuteGraphQL.mock.calls.length).toBe(1)
  })
})
