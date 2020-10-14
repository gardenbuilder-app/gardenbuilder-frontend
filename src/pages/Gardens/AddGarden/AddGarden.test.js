import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import userEvent from "@testing-library/user-event"
import { spy } from 'sinon';

import client from "ApolloClient"
import { AddGarden } from "./AddGarden"
import { CREATE_GARDEN_MUTATION } from 'mutations';

describe("<AddGarden/>", () => {
  beforeEach(() => {
    render(
      <ApolloProvider client={client}>
        <AddGarden />
      </ApolloProvider>
    )
  })

  it("renders correctly", async () => {
    expect(await screen.findByText("Add Garden")).toBeInTheDocument()
  })

  it('toggles the Add Garden form on click', async () => {
    //toggle form open
    const toggler = await screen.findByText(/Add Garden/i)
    await userEvent.click(toggler);
    //assert open
    expect(await screen.findByText(/Garden Name/i)).toBeInTheDocument();
    //toggle closed
    await userEvent.click(toggler);
    //assert closed
    await waitFor(() => {
      expect(screen.queryByText(/Garden Name/i)).toBeNull()
    })
  });

  it('changes the value of the input upon typing', async () => {
    //toggle form open
    const toggler = await screen.findByText(/Add Garden/i)
    await userEvent.click(toggler);
    //type in input
    const input = await screen.findByRole('textbox')
    await userEvent.type(input, 'New Garden')
    //assert value change
    expect(input).toHaveValue('New Garden')
  })

  it('fires CREATE_GARDEN_MUTATION on button click', async () => {
    //toggle form open
    const toggler = await screen.findByText(/Add Garden/i)
    await userEvent.click(toggler);
    //type in input
    const input = await screen.findByRole('textbox')
    await userEvent.type(input, 'New Garden')
    //assert value change
    expect(input).toHaveValue('New Garden')
    //spy on client mutations
    spy(client, 'mutate')
    //click 'Add' button
    const button = await screen.findByRole('button', {name: /Add/i})
    await userEvent.click(button)
    //assert mutation called
    expect(client.mutate.getCall(0).args[0].mutation).toEqual(
      CREATE_GARDEN_MUTATION,
    );
    //assert variables
    expect(client.mutate.getCall(0).args[0].variables).toEqual({
      name: 'New Garden',
    });
  })
})
