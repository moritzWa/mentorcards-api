const quotesResolvers = require("./quotes")
const usersResolvers = require("./users")

module.exports = {
  Query: {
    ...quotesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
}
