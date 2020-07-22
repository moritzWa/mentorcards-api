const { AuthenticationError, UserInputError } = require("apollo-server")

const checkAuth = require("../../util/check-auth")
const Mentor = require("../../models/Mentor")

module.exports = {
  Query: {
    async getMentors() {
      console.log("route hit")
      try {
        const mentors = await Mentor.find().sort({ createdAt: -1 })
        console.log("getMentors", mentors)
        return mentors
      } catch (err) {
        throw new Error(err)
      }
    },
    async getMentor(_, { quoteId }) {
      try {
        const quote = await Mentor.findById(quoteId)
        if (quote) {
          return quote
        } else {
          throw new Error("Mentor not found")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createMentor(
      _,
      { mentorInput: { mentorname, imageUrl, aboutText, profileUrl } },
      context
    ) {
      console.log("rout hit")
      const user = checkAuth(context)

      if (mentorname.trim() === "") {
        throw new Error("Mentor body must not be empty")
      }

      const newMentor = new Mentor({
        mentorname,
        imageUrl,
        aboutText,
        profileUrl,
        createdAt: new Date().toISOString(),
        username: user.username,
      })

      const res = await newMentor.save()

      console.log("res:", res)
      return {
        ...res._doc,
      }
    },
  },
}
