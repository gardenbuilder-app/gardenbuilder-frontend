import { sentenceCase } from "./sentenceCase"

it("Capitalizes the first word of any string", () => {
  expect(sentenceCase("hi mom")).toBe("Hi mom")
})

it("Returns an empty string from an empty string", () => {
  expect(sentenceCase("")).toBe("")
})

it("Returns undefined if not passed a string", () => {
  expect(sentenceCase()).toBe(undefined)
})
