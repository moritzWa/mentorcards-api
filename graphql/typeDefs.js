const { gql } = require("apollo-server")

module.exports = gql`
  type Quote {
    id: ID!
    body: String!
    mentorRef: Mentor
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Mentor {
    id: ID
    mentorname: String!
    imageUrl: String!
    aboutText: String!
    profileUrl: String!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input MentorInput {
    mentorname: String!
    imageUrl: String!
    aboutText: String!
    profileUrl: String!
  }
  type Query {
    getQuotes: [Quote]
    getQuote(quoteId: ID!): Quote
    getMentors: [Mentor]
    getMentor(mentorId: ID!): Mentor
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createQuote(body: String!, mentorRef: String!): Quote!
    deleteQuote(quoteId: ID!): String!
    createMentor(mentorInput: MentorInput): Mentor!
    createComment(quoteId: String!, body: String!): Quote!
    # quoteId to check if quote still exists
    deleteComment(quoteId: ID!, commentId: ID!): Quote!
    # toggles value
    likeQuote(quoteId: ID!): Quote!
  }
  type Subscription {
    newQuote: Quote!
  }
`

//changed non-nullable Mentor id to nullable because of bug: https://github.com/apollographql/apollo-client/issues/4180
