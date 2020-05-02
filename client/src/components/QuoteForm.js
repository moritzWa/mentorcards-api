import React from "react"
import { Button, Form } from "semantic-ui-react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { useForm } from "../util/hooks"
import { FETCH_QUOTES_QUERY } from "../util/graphql"

function QuoteForm() {
  const { values, onChange, onSubmit } = useForm(createQuoteCallback, {
    body: "",
  })

  //only one type of error
  const [createQuote, { error }] = useMutation(CREATE_QUOTE_MUTATION, {
    variables: values,
    update(proxy, result) {
      //data = storage of responses
      const data = proxy.readQuery({
        query: FETCH_QUOTES_QUERY,
      })
      const newQuote = result.data.createQuote
      proxy.writeQuery({
        query: FETCH_QUOTES_QUERY,
        //pushing newQuote (of createQuote-mutation ) into cach
        data: { getQuotes: [newQuote, ...data.getQuotes] },
      })
      values.body = ""
    },
    onError(err) {
      //console.log(err)
    },
  })

  function createQuoteCallback() {
    createQuote()
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a quote:</h2>
        <Form.Field>
          <Form.Input
            placeholder="One way to remember who..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

const CREATE_QUOTE_MUTATION = gql`
  mutation createQuote($body: String!) {
    createQuote(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export default QuoteForm
