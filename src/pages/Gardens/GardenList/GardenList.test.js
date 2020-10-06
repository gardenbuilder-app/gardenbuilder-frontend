import React from "react"
import { render } from "@testing-library/react"
import { GardenList } from "./GardenList"
import { MockedProvider } from "@apollo/client/testing"

describe("<GardenList /> component", () => {
  const container = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <GardenList />
    </MockedProvider>
  )

  it("has no tests yet", () => {
    console.warn("FAKE TEST WARNING: There are no tests here yet")
    expect("No tests yet").toBe("No tests yet")
  })
})
