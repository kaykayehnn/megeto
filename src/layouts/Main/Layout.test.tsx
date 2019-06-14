import React from "react"
import { render } from "@testing-library/react"

import "jest-dom/extend-expect"

import Layout from "."

const headerText = 'Математическа Гимназия "Академик Кирил Попов"'

describe("Layout Component", () => {
  it("renders header when not on home page", () => {
    const { getByText } = render(<Layout location={{ pathname: "/example" }} />)

    const header = getByText(headerText)

    expect(header).toBeInTheDocument()
  })

  it("does not render header when on home page", () => {
    const { queryByText } = render(
      <Layout location={{ pathname: "/example" }} />
    )

    const header = queryByText(headerText)

    expect(header).not.toBeInTheDocument()
  })
})
