import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import MockComponent from './mockComponent'
import {server} from '../../mocks/server';
import apolloClient from '../../index';

beforeEach(() => server.listen())
afterAll(() => server.close());

describe('<MockComponent/>', () => {
  beforeEach(() => {
    render(<MockComponent/>)
  })
  it('renders properly', async () => {
    expect(await screen.findByRole('button', {name: /Sup/i})).toBeInTheDocument();
  });
})