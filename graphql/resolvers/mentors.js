const { AuthenticationError, UserInputError } = require("apollo-server")

const checkAuth = require("../../util/check-auth")
const Mentor = require("../../models/Mentor")

module.exports = {
  Mutation: {
    async createMentor(
      _,
      { mentorInput: { mentorname, imageUrl, aboutText, profileUrl } },
      context
    ) {
      console.log("rout hit")
      const user = checkAuth(context)

      if (mentorname.trim() === "") {
        throw new Error("Quote body must not be empty")
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
