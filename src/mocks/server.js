import { setupServer } from "msw/node"
import { handlers } from "./handlers"
export const server = setupServer(...handlers)

/**
 * This server is started on each test run, and the Apollo Client automatically sends requests
 * to it when in test mode. In your render method, wrap your component in an <ApolloProvider /> (imported
 * from '@apollo/client' with an instance of the Apollo Client (the default export of 'src/ApolloClient')
 * passed to the 'client' prop to access this functionality.
 *
 * If you modify an existing query or mutation, or create a new one, please mock it in './handlers'
 * mirroring the most reusable use-case. You can run one-off instances for edge cases by importing this
 * server and wrapping the desired mock in 'server.use()' and appending 'res()' to 'res.once()'.
 *
 * Using this methodology gives us convenient, standardized mocking while retaining options for granular
 * control. It also avoids much-dreaded opaque <MockProvider /> errors!
 */
