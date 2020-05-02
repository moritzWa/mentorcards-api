import gql from "graphql-tag"

export const FETCH_QUOTES_QUERY = gql`
  {
    getQuotes {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`
