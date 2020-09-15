import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { Gardens } from "./Gardens"
import { GET_USER_GARDENS } from "../../queries/queries"

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

describe("<Gardens /> view", () => {
  /**
   *  Set up conditions for each test.
   *  We must rerender before each new assertion
   */
  let getByText, getAllByText
  beforeEach(() => {
    const tools = render(
      <MockedProvider mocks={[mockQuery]} addTypename={false}>
        <Gardens />
      </MockedProvider>
    )
    getByText = tools.getByText
    getAllByText = tools.getAllByText
  })

  it("renders its title", async () => {
    expect(getByText("Gardens")).toBeInTheDocument()
  })

  it("renders garden names from graphql query", async () => {
    await waitFor(() => expect(getAllByText(/Garden \w/)).toHaveLength(2))
  })
})
