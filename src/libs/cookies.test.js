import { getToken, setToken, eraseToken } from "./cookies"

// get expiration date in gmt format
function getExpirationDate(days) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 1200 * 1000)
  return date.toGMTString()
}

describe("the setToken function", () => {
  it("should store a passed value into the cookie", () => {
    setToken("testing123")
    expect(
      document.cookie
        .split("; ")
        .find((key) => key.startsWith("gardenbuilder-jwt-token"))
        .split("=")[1]
    ).toBe("testing123")
  })

  it("should set the gardenbuilder-jwt-token to expire the same number of days away that are passed to it", () => {
    const DAYS = 3
    setToken("testing123", DAYS)
    expect(
      document.cookie
        .split("; ")
        .find((key) => key.startsWith("expires"))
        .split("=")[1]
    ).toBe(getExpirationDate(DAYS))
  })

  it("should set the gardenbuilder-jwt-token to expire in 7 days by default", () => {
    const DAYS = 7
    setToken("testing123")
    expect(
      document.cookie
        .split("; ")
        .find((key) => key.startsWith("expires"))
        .split("=")[1]
    ).toBe(getExpirationDate(DAYS))
  })
})

describe("the eraseToken function", () => {
  it("should set the token expiration date to yesterday", () => {
    const DAYS = -1
    setToken("testing123")
    eraseToken()
    expect(
      document.cookie
        .split("; ")
        .find((key) => key.startsWith("expires"))
        .split("=")[1]
    ).toBe(getExpirationDate(-1))
  })
})

describe("the getToken function", () => {
  it("should get a token from the cookie if one has been set", () => {
    setToken("testing123")
    expect(getToken()).toBe("testing123")
  })
})
