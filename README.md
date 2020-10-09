# Gardenbuilder

A tool to design and plan a vegetable garden

## Basic Features

This app will allow users to:

- Document, manage, and retrieve data about on or more gardens.
- Document, manage, and retrieve data about beds in each garden.
- Enter dimensions of each bed.
- Beds are envisioned as a grid, with plants or a plant in each section of the grid.
- Manage and document what plant is planted in each section.
- Retrieve data in aggregate and individually for current and future sections, beds, gardens, and users.

## Getting started

### Starting this project

```bash
git pull https://github.com/capndave/gardenbuilder-frontend.git
cd gardenbuilder-frontend
npm start
```

### Default (Public) API

The quickest way to get up and running is to start the project as above. Any data called by the app will be from the public-facing [GraphQL API](https://gardenbuilder-backend.uc.r.appspot.com/graphql/). You can explore the queries and mutations available through the API by clicking the `Docs` button on the top right corner of that page.

### Local API

It's also possible to run a copy of the API locally, following instructions at [gardenbuilder-backend](https://github.com/capndave/gardenbuilder-backend). If you do so, you'll also need to make a `.env` file in the `gardenbuilder-frontend` directory and type the following in it(assuming you're running the `gardenbuilder-api` locally):

```javascript
REACT_APP_GRAPHQL_SERVER="http://localhost:8000/graphql/
```

We welcome changes to the (local) API, which you can then submit pull requests for.

## Contributing

We would love some help, especially for [Hacktoberfest](https://hacktoberfest.digitalocean.com/)!

### Design Help

We would love help coming up with wireframes and designs for the pages in this app. If interested, please reach out to Dave at [`capndavet@gmail.com`](mailto:capndavet@gmail.com)

### General Code Contributions

There are a number of [issues](https://github.com/capndave/gardenbuilder-frontend/issues) that we would love your help with. Many of them are fairly easy and are tagged as `good first issue`. Most are things that I (capndave), just haven't gotten around to yet. Feel free to fork, work on, and submit a pull request for anything you see an issue for.

For more detail, please see our [contribution guidelines](https://github.com/capndave/gardenbuilder-frontend/blob/master/CONTRIBUTING.md).

### Code of Conduct

Please remember to read and adhere our [code of conduct](https://github.com/capndave/gardenbuilder-frontend/blob/master/CODE_OF_CONDUCT.md) - we think it's very important to foster open, respectful community amongst developers!

### Further Involvement

If you are interested in ok-ing pull requests, co-managing this repo or anything else beyond occasional contributions, please email me at capndavet@gmail.com. I'd love your help!

## Contact

Questions? Feel free to contact Dave at `capndavet@gmail.com`.
