import React from 'react';
import { render,  screen, waitFor } from '@testing-library/react'
import { ApolloProvider } from '@apollo/client'
import client from 'ApolloClient';
import userEvent from '@testing-library/user-event';
import { AddGarden } from './AddGarden'

describe('<AddGarden/>', () => {
  beforeEach(() => {
    render(
      <ApolloProvider client={client}>
        <AddGarden/>
      </ApolloProvider>
    )
  })

  it('renders correctly', async () => {
    expect(await screen.findByText('Add Garden')).toBeInTheDocument();
  })

  it('toggles the Add Garden form on click', async () => {
    const toggler = await screen.findByText(/Add Garden/i)
    await userEvent.click(toggler);
    expect(await screen.findByText(/Garden Name/i)).toBeInTheDocument();
    await userEvent.click(toggler);
    await waitFor(() => {
      expect(screen.queryByText(/Garden Name/i)).toBeNull();
    })
  })
})