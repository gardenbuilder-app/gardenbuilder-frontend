import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { spy } from 'sinon';
import { ApolloProvider } from '@apollo/client';

import client from 'ApolloClient';
import { AddBed } from './AddBed';

describe ('<AddBed />', () => {
  const addBedRender = (
      <ApolloProvider client={client}>
        <AddBed id="abc123"/>
      </ApolloProvider>

  )

  it('renders properly', async () => {
    render(addBedRender)
    expect(await screen.findByText(/Add Bed/i)).toBeInTheDocument();
  })

  it('renders with the form closed', async () => {
    render(addBedRender)
    expect(await screen.findByText(/Add Bed/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Name/i)).not.toBeInTheDocument();
  });

  it('toggles the form on button click', async () => {
    render(addBedRender);

    const button = await screen.findByText(/Add Bed/i)
    userEvent.click(button);
    expect(await screen.findByLabelText(/Name/i)).toBeInTheDocument();
  })
})