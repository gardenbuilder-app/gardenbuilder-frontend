import React from "react"
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { ApolloProvider } from '@apollo/client';

import client from 'ApolloClient'
import { BedList } from "./BedList"

describe("<BedList /> component", () => {
  beforeEach(() => {
  render(
    <ApolloProvider client={client}>
      <BedList id="123"/>
    </ApolloProvider>)
  })

  it("renders a loader while loading", () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  })

  it("renders bed data", async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(screen.getByRole('link', {name: /Cool Garden/i})).toBeInTheDocument();
    expect(screen.getByText(/4 feet long/i)).toBeInTheDocument();
    expect(screen.getByText(/4 feet wide/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
  })
});