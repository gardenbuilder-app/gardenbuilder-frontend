import { graphql } from "msw"

export const handlers = [
  //Example query mock formatting, with data
  graphql.query("MOCK_QUERY", (req, res, ctx) => {
    return res(
      ctx.data({
        fake: {
          id: 'abc123'
        }
      })
    )
  }),

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

  graphql.mutation("MOCK_MUTATION", (req, res, ctx) => {
    const {id} = req.variables
    if (id === 'abc123') {
      return res(
        ctx.data({
          makeThing: {
            id: 'abc123'
          }
        })
      )
    } else {
      return res(
        ctx.errors([
          {
            status: 400,
            message: 'Not a valid id'
          }
        ])
      )
    }
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