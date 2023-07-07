import { render, screen } from "@testing-library/react"
import App from "../src/App"
import React from "react"

describe("App", () => {
    it("renders loading", () => {
        render(<App />)
        const headline = screen.getByText(/Loading.../i)
        expect(headline).toBeInTheDocument()
    })
})
