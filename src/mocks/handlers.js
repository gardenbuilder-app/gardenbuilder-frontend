import { graphql } from "msw"

export const handlers = [
  //Example query mock formatting, with error
  graphql.query("EXAMPLE_USER_QUERY", (req, res, ctx) => {
    return res(
      ctx.errors([
        {
          status: 400,
          message: 'OOPS'
        }
      ]))
  }),

  //Example mutation mock formatting, with result
  graphql.mutation("EXAMPLE_LOGIN_MUTATION", (req, res, ctx) => {
    return res(
      ctx.data({
        login: {
          username,
        },
      })
    )
  }),
]