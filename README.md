# Discovering GraphQL with NestJS

## About the project

The project's here to demonstrate basic features of [NestJS](https://docs.nestjs.com/graphql) (used in conjunction
with [Apollo](https://www.apollographql.com/docs/apollo-server/)). During this project, we're gonna interact with
the [SpaceX REST API](https://github.com/r-spacex/SpaceX-API) in order to find information about launches and used
launchers.

### Queries

This project demonstrates [query resolvers](https://docs.nestjs.com/graphql/resolvers). You can find there :

- Nested static resolving, using nested properties in the response
- Nested dynamic resolving, using some parameters in the response to query more data and aggregate it

### Mutations

This project also demonstrates [mutations](https://docs.nestjs.com/graphql/mutations).

## Available GraphQL requests

In order to try the application, just run in with `yarn start:dev` and
open [the GraphQL playground](http://localhost:3000/graphql) (enabled on development environment **only**)

### Find all launches

```
query FindAll {
  launches {
    site
    cursor
    rocket {
      id
      name
      stages
    }
  }
}
```

### Find a launch

```
query FindOne {
  launch(id: "101") {
    site
    cursor
    rocket {
      id
      name
      stages
    }
  }
}
```

### Find some launches

```
query FindSome {
  launchesByIds(ids: ["101", "109"]) {
    site {
      name
      active
    }
    cursor
    rocket {
      id
      name
      stages
    }
  }
}
```

### Create a launch

```
mutation CreateLaunch {
 launch(launchRequest: {missionId: "101", rocketId: "falconheavy", launchPadId: "ccafs_slc_40" }) {
    site {
      name
      active
    }
    cursor
    rocket {
      name
      stages
    }
  }
}
```
