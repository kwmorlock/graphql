var express = require("express");
var express_graphql = require("express-graphql");
var { buildSchema } = require("graphql");

// GraphQL Schema this describes the api type system,
// includes complete set of data, how a client can access
// the data, what operations we are able to query, create,
// or update of the data. Each time the client makes an api
// call it is validated against that schema, and only if
// validation is successful is the operation is executed
// otherwise an error is returned.
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// resolver, attach a function that is called each time
// a query from our schema needs to be executed, because
// a client is requestint to execute the query

// root resolver
var root = {
  message: () => "Meow!",
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
); //endpoint

app.listem(4000, () => console.log("Server now running!"));
