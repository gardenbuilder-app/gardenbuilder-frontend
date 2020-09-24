import React, { useState } from "react"
import { render, fireEvent, screen, getByRole, within } from "@testing-library/react"
import { Logout } from "./Logout"

describe.only("<MobileHeader /> component", () => {
  const { getByText, getByRole } = render(<Logout />)

  it("should render the words Log Out on the screen", () => {
    const logoutText = getByText("Log Out")
    expect(logoutText).toBeInTheDocument()
  })
})
