import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Grid, Transition } from "semantic-ui-react"

import { AuthContext } from "../context/auth"
import QuoteCard from "../components/QuoteCard"
import QuoteForm from "../components/QuoteForm"
import { FETCH_QUOTES_QUERY } from "../util/graphql"

function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_QUOTES_QUERY)

  let quotes = []

  if (data) {
    const { getQuotes } = data
    quotes = getQuotes
    console.log(quotes)
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Quotes</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <QuoteForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading quotes..</h1>
        ) : (
          <Transition.Group>
            {quotes &&
              quotes.map((quote) => (
                <Grid.Column key={quote.id} style={{ marginBottom: 20 }}>
                  <QuoteCard quote={quote} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home
