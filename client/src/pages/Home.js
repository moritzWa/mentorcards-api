import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Grid } from "semantic-ui-react"

import QuoteCard from "../components/QuoteCard"

function Home() {
  const {
    loading,
    data: { getQuotes: quotes },
  } = useQuery(FETCH_QUOTES_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Quotes</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading quotes..</h1>
        ) : (
          quotes &&
          quotes.map((quote) => (
            <Grid.Column key={quote.id} style={{ marginBottom: 20 }}>
              <QuoteCard quote={quote} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

const FETCH_QUOTES_QUERY = gql`
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

export default Home
