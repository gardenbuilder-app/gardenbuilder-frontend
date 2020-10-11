# Contributing to Gardenbuilder-frontend

We appreciate contributions to our code and documentation! We also welcome help from anyone participating in [Hacktoberfest](https://hacktoberfest.digitalocean.com/). We do ask that you observe the guidelines outlined in each section below.

Please note we have a [code of conduct](https://github.com/capndave/gardenbuilder-frontend/blob/master/CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

---

### Design Help

We would love help coming up with wireframes and designs for the pages in this app. If interested, please reach out to Dave at [`capndavet@gmail.com`](mailto:capndavet@gmail.com)

### Submitting Issues

Please submit issues liberally. Since this application is under development you can feel free to add issues for any incomplete part of the application, as you imagine it would be implemented best.

### Documentation Updates

Minor changes to documentation can be submitted as a pull request without making an issue first.

### General Code Contributions

When contributing to this repository, please first discuss the change you wish to make in an [issue](https://github.com/capndave/gardenbuilder-frontend/issues). There are also a number of preexisting [issues](https://github.com/capndave/gardenbuilder-frontend/issues) that we would love your help with. Many of them are fairly easy and are tagged as `good first issue`. Most are things that we just haven't gotten around to yet. Before working on something, please:

- [x] Ensure that no one is working on the issue by checking that no one is listed in the Assignees field of a particular issue (generally on the upper-right hand corner of the issue screen)
- [x] If no contributor is already assigned, express your interest in working on the issue by writing a comment for that issue
- [x] Wait for a project maintainer to assign you the issue before you start working on it.

Generally speaking, the first person who expresses interest in working on an issue will be assigned. We may ignore pull requests from those who submit them without being assigned to work on the issue, particularly if someone else expressed interest in working on the issue before them.

Once you are assigned to work on an issue, please fork, work on it, and submit a pull request that references the related issue.

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

If you modify an existing query or mutation, or create a new one, please edit or create the respective mock in 'src/mocks/handlers'. Try to represent a highly reusable use-case, as this will be the default mock in all tests.

You can run one-off instances for exceptions and edge cases within an individual test by importing the server and wrapping the desired mock in 'server.use()' and appending 'res()' with 'res.once()', like so:

```javascript
import { server } from "src/mocks/server"

server.use(
  graphql.query("MOCK_QUERY", (req, res, ctx) => {
    return res.once(
      ctx.data({
        ...data,
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
