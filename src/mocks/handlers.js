import { graphql } from "msw"

export const handlers = [
  /*************************
      QUERY MOCKS
  ***************************/

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

  graphql.query("GET_USER_GARDENS", (req, res, ctx) => {
    return res(
      ctx.data({
        userGardens: [
          {
            id: "1",
            gardenName: "Garden One",
          },
          {
            id: "2",
            gardenName: "Garden Two",
          }
        ]
      })
    )
  }),

  /*************************
      MUTATION MOCKS
  ***************************/

  graphql.mutation("SIGNUP_MUTATION", (req, res, ctx) => {
    const { email, password } = req.variables;
    return res(
      ctx.data({
        createUser: {
          user: {
            id: '1',
            email,
            password,
          }
        }
      })
    )
  }),

  graphql.mutation("SIGNIN_MUTATION", (req, res, ctx) => {
    const { email, password } = req.variables;
    if (email === 'test@test.com' && password === 'testing123!') {
      return res(
        ctx.data({
          tokenAuth: {
            token: 'abc123'
          }
        })
      )
    }
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