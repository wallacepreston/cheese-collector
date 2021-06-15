# Cheese Collector
An API for users to collect cheeses.
## Getting Started

    npm i
    createdb cheese-collector
    npm run seed
    npm run start:dev

Visit http://localhost:4000/graphql to use the interactive GraphQL sandbox

**INSTRUCTIONS BELOW "Tech Used"👇**
## Tech Used
- Backend
  - Node
  - Express
  - GraphQL
    - `apollo-server`
    - `apollo-server-express`
- Frontend
  - React
  - GraphQL
    - `@apollo/client`
  - React Context

## Example queries
### Query

### Paginated Query
In this case, we want the 2nd page, only including 4 per page
```
query{
  cheeses(pageSize: 4, page: 2) {
    cheeses {
      id
      title
    }
    total
  }
}
```
### Mutations
In this case, to create a new cheese
```
mutation {
  createCheese(title: "swiss", description: "it has holes"){
    id
    title
    description
  }
}
```

### Fragments
In this case, `CheeseParts` is the fragment we've created to reuse
```
query{
    cheeses {
        ...CheeseParts
    }
    boards {
        id
        cheeses {
        ...CheeseParts
        }
    }
}

fragment CheeseParts on Cheese {
    id
    title
    description
}
```
