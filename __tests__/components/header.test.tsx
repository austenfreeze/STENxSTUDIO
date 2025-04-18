import { render, screen } from "@testing-library/react"
import { Header } from "@/components/header"

// Mock usePathname
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />)
    expect(screen.getByText("STEN-STUDIO")).toBeInTheDocument()
  })

  it("renders navigation links", () => {
    render(<Header />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Blog")).toBeInTheDocument()
    expect(screen.getByText("Categories")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })
})
