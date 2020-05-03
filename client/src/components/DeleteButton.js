import React, { useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { Button, Confirm, Icon } from "semantic-ui-react"

import { FETCH_QUOTES_QUERY } from "../util/graphql"
import ToolTipWrap from "../util/ToolTipWrap"

function DeleteButton({ quoteId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  //on comment or quote?
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_QUOTE_MUTATION

  const [deleteQuoteOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_QUOTES_QUERY,
        })
        data.getQuotes = data.getQuotes.filter((p) => p.id !== quoteId)
        proxy.writeQuery({ query: FETCH_QUOTES_QUERY, data })
      }
      // reroute to homepage
      if (callback) callback()
    },
    variables: {
      quoteId,
      commentId,
    },
  })
  return (
    <>
      <ToolTipWrap content={commentId ? "Delete comment" : "Delete quote"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </ToolTipWrap>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteQuoteOrMutation}
      />
    </>
  )
}

const DELETE_QUOTE_MUTATION = gql`
  mutation deleteQuote($quoteId: ID!) {
    deleteQuote(quoteId: $quoteId)
  }
`
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($quoteId: ID!, $commentId: ID!) {
    deleteComment(quoteId: $quoteId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteButton
