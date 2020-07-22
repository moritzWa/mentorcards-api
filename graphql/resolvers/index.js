const quotesResolvers = require("./quotes")
const mentorsResolvers = require("./mentors")
const usersResolvers = require("./users")
const commentsResolvers = require("./comments")

module.exports = {
  Quote: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...quotesResolvers.Query,
    ...mentorsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...quotesResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...mentorsResolvers.Mutation,
  },
  Subscription: {
    ...quotesResolvers.Subscription,
  },
}
