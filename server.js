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
