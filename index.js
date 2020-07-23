const colors = require("colors")
const mongoose = require("mongoose")

const { ApolloServer, PubSub } = require("apollo-server")
const dotenv = require("dotenv")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

dotenv.config({ path: "./config.env" })

const pubsub = new PubSub()

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //forewarding request body to the context
  //  ie third argument
  context: ({ req }) => ({ req, pubsub }),
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db".blue)
    return server.listen({ port: PORT }).then((res) => {
      console.log(`Server running at ${res.url}`.cyan)
    })
  })
  .catch((err) => {
    console.error(err)
  })
