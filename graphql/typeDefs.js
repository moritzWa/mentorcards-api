const { gql } = require("apollo-server")

module.exports = gql`
  type Quote {
    id: ID!
    body: String!
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
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getQuotes: [Quote]
    getQuote(quoteId: ID!): Quote
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createQuote(body: String!): Quote!
    deleteQuote(quoteId: ID!): String!
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
