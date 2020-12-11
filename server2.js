var express = require("express");
const { graphqlHTTP } = require("express-graphql"); //updated version, past versions in older tutorials will not work
var { buildSchema } = require("graphql");

// GraphQL Schema this describes the api type system,
// includes complete set of data, how a client can access
// the data, what operations we are able to query, create,
// or update of the data. Each time the client makes an api
// call it is validated against that schema, and only if
// validation is successful is the operation is executed
// otherwise an error is returned.

//[Course] is an array
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
       
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

// resolver, attach a function that is called each time
// a query from our schema needs to be executed, because
// a client is requestint to execute the query

// root resolver
//getCourse and getCourses are the functions
var root = {
  course: getCourse,
  courses: getCourses
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("Server now running!"));
