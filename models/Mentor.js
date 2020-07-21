const { model, Schema } = require("mongoose")

const mentorSchema = new Schema({
  mentorname: String,
  imageUrl: String,
  aboutText: String,
  createdAt: String,
  profileUrl: String,
  username: String,
})

module.exports = model("Mentor", mentorSchema)

//virtual population of quotes
