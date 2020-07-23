const { AuthenticationError, UserInputError } = require("apollo-server")

const checkAuth = require("../../util/check-auth")
const Quote = require("../../models/Quote")

module.exports = {
  Query: {
    async getQuotes() {
      try {
        const quotes = await Quote.find()
          .sort({ createdAt: -1 })
          .populate("mentorRef")

        console.log("getquotes", quotes)
        return quotes
      } catch (err) {
        throw new Error(err)
      }
    },
    async getQuote(_, { quoteId }) {
      try {
        const quote = await Quote.findById(quoteId)
        if (quote) {
          return quote
        } else {
          throw new Error("Quote not found")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createQuote(_, { body, mentorRef }, context) {
      const user = checkAuth(context)

      if (body.trim() === "") {
        throw new Error("Quote body must not be empty")
      }

      body.replace(/['"]+/g, "")

      const newQuote = new Quote({
        body,
        mentorRef,
        username: user.username,
        createdAt: new Date().toISOString(),
        user: user.id,
      })

      const quote = await newQuote.save()

      context.pubsub.publish("NEW_QUOTE", {
        newQuote: quote,
      })

      return quote
    },
    async deleteQuote(_, { quoteId }, context) {
      const user = checkAuth(context)

      try {
        const quote = await Quote.findById(quoteId)
        if (user.username === quote.username) {
          await quote.delete()
          return "Quote deleted successfully"
        } else {
          throw new AuthenticationError("Action not allowed")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async likeQuote(_, { quoteId }, context) {
      const { username } = checkAuth(context)

      const quote = await Quote.findById(quoteId)
      if (quote) {
        if (quote.likes.find((like) => like.username === username)) {
          // Quote already liked = unlike it
          quote.likes = quote.likes.filter((like) => like.username !== username)
        } else {
          // Not liked = like quote
          quote.likes.push({
            username,
            createdAt: new Date().toISOString(),
          })
        }

        await quote.save()
        return quote
      } else throw new UserInputError("Quote not found")
    },
  },
  Subscription: {
    newQuote: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_QUOTE"),
    },
  },
}
