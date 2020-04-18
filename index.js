const colors = require("colors")
const { ApolloServer } = require("apollo-server")
const gql = require("graphql-tag")
const mongoose = require("mongoose")

const { MONGODB } = require("./config.js")

const { User } = require("./models/User")
const { Quote } = require("./models/Quote")

const typeDefs = gql`
  type Quote {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getQuotes: [Quote]
  }
`

const resolvers = {
  Query: {
    async getQuotes() {
      try {
        const quotes = await Quote.find()
        return quotes
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db".blue)
    return server.listen({ port: 5000 }).then((res) => {
      console.log(`Server running at ${res.url}`.green)
    })
  })
