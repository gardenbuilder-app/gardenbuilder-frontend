import React from "react"
import { render, screen } from "@testing-library/react"
import { ApolloProvider } from "@apollo/client"
import routeData from "react-router"
import { Garden } from "./Garden"
import client from "ApolloClient"

describe("<Garden /> view", () => {
  const mockLocation = {
    pathname: "/garden#1",
    hash: 1,
    state: {
      gardenId: 1,
      gardenName: "Garden One",
    },
    search: "",
  }
  /**
   *  Set up conditions for each test.
   *  We must rerender before each new assertion
   */
  beforeEach(() => {
    // use fake location data
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation)

    render(
      <ApolloProvider client={client} addTypename={false}>
        <Garden />
      </ApolloProvider>
    )
  })

  it("renders title from location data", async () => {
    expect(await screen.findByText("Garden One")).toBeInTheDocument()
  })

  it("renders the AddBed component", async () => {
    expect(await screen.findByText(/Add Bed/i)).toBeInTheDocument()
  })
})
