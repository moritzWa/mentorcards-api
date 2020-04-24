const { AuthenticationError, UserInputError } = require("apollo-server")

const checkAuth = require("../../util/check-auth")
const Quote = require("../../models/Quote")

module.exports = {
  Mutation: {
    //                        destructuring arguments
    createComment: async (_, { quoteId, body }, context) => {
      const { username } = checkAuth(context)
      //if comment is empty
      if (body.trim() === "") {
        throw new UserInputError("Empty comment submitted", {
          errors: {
            body: "Comment body can not be empty",
          },
        })
      }

      const quote = await Quote.findById(quoteId)

      if (quote) {
        quote.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        })
        await quote.save()
        return quote
      } else throw new UserInputError("This Quote wasn't found")
    },
    async deleteComment(_, { quoteId, commentId }, context) {
      const { username } = checkAuth(context)

      const quote = await Quote.findById(quoteId)

      if (quote) {
        const commentIndex = quote.comments.findIndex((c) => c.id === commentId)

        if (quote.comments[commentIndex].username === username) {
          quote.comments.splice(commentIndex, 1)
          await quote.save()
          return quote
        } else {
          throw new AuthenticationError("Action wasn't allowed")
        }
      } else {
        throw new UserInputError("This Quote wasn't found")
      }
    },
  },
}
