import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { spy } from 'sinon';
import { ApolloProvider } from '@apollo/client';

import client from 'ApolloClient';
import { AddBed } from './AddBed';
import { CREATE_BED_MUTATION } from 'mutations';

//toggles form open
async function toggleForm() {
  const button = await screen.findByText(/Add Bed/i)
  await userEvent.click(button);
}

//identifies fills all inputs in form
async function fillInputs() {
  const name = await screen.findByLabelText(/Bed Name/i)
  const length = await screen.findByLabelText(/Length/i)
  const width = await screen.findByLabelText(/Width/i)
  await userEvent.type(name, "Cool Garden")
  await userEvent.type(length, "4")
  await userEvent.type(width, "8")
  await waitFor(() => {
    expect(screen.getByDisplayValue(/Cool Garden/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/4/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/8/i)).toBeInTheDocument();
  })
}

describe ('<AddBed />', () => {
  const addBedRender = (
      <ApolloProvider client={client}>
        <AddBed id="123"/>
      </ApolloProvider>

  )

  it('renders properly', async () => {
    render(addBedRender)
    expect(await screen.findByText(/Add Bed/i)).toBeInTheDocument();
  })

  it('initially renders with the form closed', async () => {
    render(addBedRender)
    expect(await screen.findByText(/Add Bed/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Name/i)).not.toBeInTheDocument();
  });

  it('toggles the form on button click', async () => {
    render(addBedRender);
    await toggleForm();
    expect(await screen.findByLabelText(/Bed Name/i)).toBeInTheDocument();
  })

  it('handles text input properly', async () => {
    render(addBedRender)
    await toggleForm()
    await fillInputs()
  });

  it('calls CREATE_BED_MUTATION with correct variables', async () => {
    //render component, open and fill form
    render(addBedRender)
    await toggleForm()
    await fillInputs()
    //spy on Apollo Client mutations and click button to fire
    spy(client, "mutate");
    const submitButton = await screen.findAllByRole('button', {name: /Add/i})
    await userEvent.click(submitButton[0]);
    //Assert the proper mutation is called with variables as entered
    expect(client.mutate.getCall(0).args[0].mutation).toEqual(CREATE_BED_MUTATION);
    expect(client.mutate.getCall(0).args[0].variables).toEqual({
      gardenId: '123',
      name: 'Cool Garden',
      width: "8",
      length: "4",
    })
  })
})