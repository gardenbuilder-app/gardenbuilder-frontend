import apolloClient from 'ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';

const Providers = ({children}) => {
  return <ApolloProvider client={apolloClient} addTypename={false}>{children}</ApolloProvider>
}

const customRender = (ui, options) => {
  render(ui, {wrapper: Providers, ...options });
}

export {
  customRender as render
}