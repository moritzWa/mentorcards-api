const quotesResolvers = require("./quotes")
const usersResolvers = require("./users")
const commentsResolvers = require("./comments")

module.exports = {
  Query: {
    ...quotesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...quotesResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
}
