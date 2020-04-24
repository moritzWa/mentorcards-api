const { AuthenticationError } = require("apollo-server")

const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

module.exports = (context) => {
  // get headers from context
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    //  check for Bearer and Token
    const token = authHeader.split("Bearer ")[1]
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY)
        return user
      } catch (err) {
        throw new AuthenticationError("Invalid or Expired token")
      }
    }
    throw new Error("Authentication token must be 'Bearer <token>")
  }
  throw new Error("Authorization header was not provided")
}
