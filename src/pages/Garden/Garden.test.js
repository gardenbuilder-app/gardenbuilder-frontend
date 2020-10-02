import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { Garden } from "./Garden"

const mockQuery = {
  request: {
    query: GET_USER_GARDENS,
  },
  result: {
    data: {
      userGardens: [
        {
          id: "1",
          gardenName: "Garden One",
        },
        {
          id: "2",
          gardenName: "Garden Two",
        },
      ],
    },
  },
}

describe("<Garden /> view", () => {
  /**
   *  Set up conditions for each test.
   *  We must rerender before each new assertion
   */
  beforeEach(() => {
    var container = render(
      <MockedProvider mocks={[mockQuery]} addTypename={false}>
        <Garden />
      </MockedProvider>
    )
  })

  it("renders its title", () => {
    expect(container.getByText("Garden")).toBeInTheDocument()
  })

  it("returns data after graphql query", async () => {})
})
