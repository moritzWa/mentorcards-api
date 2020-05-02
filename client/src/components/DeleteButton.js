import React, { useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { Button, Confirm, Icon } from "semantic-ui-react"

import { FETCH_QUOTES_QUERY } from "../util/graphql"

function DeleteButton({ quoteId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deleteQuote] = useMutation(DELETE_QUOTE_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)
      const data = proxy.readQuery({
        query: FETCH_QUOTES_QUERY,
      })
      data.getQuotes = data.getQuotes.filter((p) => p.id !== quoteId)
      proxy.writeQuery({ query: FETCH_QUOTES_QUERY, data })

      // reroute to homepage
      if (callback) callback()
    },
    variables: {
      quoteId,
    },
  })
  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteQuote}
      />
    </>
  )
}

const DELETE_QUOTE_MUTATION = gql`
  mutation deleteQuote($quoteId: ID!) {
    deleteQuote(quoteId: $quoteId)
  }
`

export default DeleteButton
