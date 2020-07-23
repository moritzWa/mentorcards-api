const { model, Schema } = require("mongoose")

const quoteSchema = new Schema({
  body: String,
  mentorRef: {
    type: Schema.Types.ObjectId,
    ref: "Mentor",
    required: true,
  },
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

module.exports = model("Quote", quoteSchema)
