# Contributing to Gardenbuilder-frontend

When contributing to this repository, please first discuss the change you wish to make via [Issues](https://github.com/capndave/gardenbuilder-frontend/issues).

Please note we have a [code of conduct](https://github.com/capndave/gardenbuilder-frontend/blob/master/CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.


___

We would love some help, especially for [Hacktoberfest](https://hacktoberfest.digitalocean.com/)!

### Design Help

We would love help coming up with wireframes and designs for the pages in this app. If interested, please reach out to Dave at [`capndavet@gmail.com`](mailto:capndavet@gmail.com)

### General Code Contributions

There are a number of [issues](https://github.com/capndave/gardenbuilder-frontend/issues) that we would love your help with. Many of them are fairly easy and are tagged as `good first issue`. Most are things that I (capndave), just haven't gotten around to yet. Feel free to fork, work on, and submit a pull request for anything you see an issue for.

If the issue you want to work on is a spelling or grammar mistake, or a documentation issue, feel free to make a pull request with your changes (without submitting an issue first)

For all other changes, please submit an issue before submitting a pull request! Please reference a given issue in cases where a related pull request is made.

### Testing Guidelines

We're working toward implementing user-centric testing as embodied in the [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles). This avoids major test breakages from minor changes in implementation details, while ensuring that the end user experience remains stable.

Our Apollo Client instance is configured to use a [Mock Service Worker](https://mwsjs.io) server ('src/mocks/server) to mock all of our GraphQL API calls during testing. Making this work in your tests is easy! See here:

```javascript
import client from 'src/ApolloClient'
import Apollo Provider from '@apollo/client'

describe('<Component />', () => {
  beforeEach(() =>
    render(
      <ApolloProvider client={client} addTypename={false}>
        <Component />
      </ApolloProvider>
    )
  );
});
```

If you modify an existing query or mutation, or create a new one, please mock it in 'src/mocks/handlers' representing the most reusable use-case. 

You can run one-off instances for edge cases by importing this server and wrapping the desired mock in 'server.use()' and appending 'res()' to 'res.once()', like so:

```javascript
import { server } from 'src/mocks/server';

server.use(
  graphql.query('MOCK_QUERY', (req, res, ctx) => {
    return res.once(
      ctx.data({
        ...data
      })
    )
  })
)
```

For any other questions regarding MSW setup and usage, please check out their [documentation](https://mswjs.io/docs).

Using this methodology gives us convenient, standardized mocking while retaining options for granular
control. It also avoids oft-dreaded opaque <MockProvider /> errors!

### Further Involvement

If you are interested in ok-ing pull requests, co-managing this repo or anything else beyond occasional contributions, please email me at capndavet@gmail.com. I'd love your help!

## Contact

Questions? Feel free to contact Dave at `capndavet@gmail.com`.