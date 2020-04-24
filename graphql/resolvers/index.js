const quotesResolvers = require("./quotes")
const usersResolvers = require("./users")
const commentsResolvers = require("./comments")

module.exports = {
  Quote: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...quotesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...quotesResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...quotesResolvers.Subscription,
  },
}
