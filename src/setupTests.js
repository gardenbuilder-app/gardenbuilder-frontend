/*
 * @jest-environment node
 */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"
import { server } from "./mocks/server"
import client from "ApolloClient"

beforeAll(() => server.listen())

afterEach(() => {
  client.stop()
  client.clearStore()
  server.resetHandlers()
})

afterAll(() => server.close())

module.exports = {
  collectCoverage: true,
  coverageDirectory: "jest-coverage",
  testEnvironment: "node",
}
