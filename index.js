var colors = require("colors")

const { ApolloServer } = require("apollo-server")
const gql = require("graphql-tag")
const mongoose = require("mongoose")
const { MONGODB } = require("./config.js")

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`
const resolvers = {
  Query: {
    sayHi: () => "Hello Moritzzzz!",
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log("connected to db".blue)
  return server.listen({ port: 5000 }).then((res) => {
    console.log(`Server running at ${res.url}`.green)
  })
})
