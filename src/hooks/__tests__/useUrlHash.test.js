import { useUrlHash } from "../useUrlHash"

beforeAll(() => {
  delete global.window.location
  const location = {
    hash: "#1=test",
    href: "https://example.com"
  }
  global.window.location = Object.assign({}, location)
})

describe("useUrlHash()", () => {
  it("should return an object", () => {
    const parsedHash = useUrlHash()
    expect(typeof parsedHash).toBe('object')
  })

  it("should return correct key/values of hash", () => {
    const parsedHash = useUrlHash()
    expect(Object.keys(parsedHash)).toContain("1")
    expect(Object.values(parsedHash)).toContain("test")
  })

  it("should return empty object if no hash exists", () => {
    global.window.location.hash = undefined
    const parsedHash = useUrlHash()
    expect(parsedHash).toEqual({})
  })
})
