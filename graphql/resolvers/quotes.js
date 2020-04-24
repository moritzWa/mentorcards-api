const Quote = require("../../models/Quote")

module.exports = {
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
