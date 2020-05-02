import React, { useContext } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import moment from "moment"
import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react"

import { AuthContext } from "../context/auth"
import LikeButton from "../components/LikeButton"
import DeleteButton from "../components/DeleteButton"

function SingleQuote(props) {
  const quoteId = props.match.params.quoteId
  const { user } = useContext(AuthContext)

  function deleteQuoteCallback() {
    props.history.push("/")
  }

  const { loading, data } = useQuery(FETCH_QUOTE_QUERY, {
    variables: {
      quoteId,
    },
  })

  let getQuote = {}

  let quoteMarkup
  if (!getQuote || loading) {
    quoteMarkup = <p>Loading quote..</p>
  } else {
    const { getQuote } = data
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getQuote

    quoteMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} quote={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment on quote")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton quoteId={id} callback={deleteQuoteCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return quoteMarkup
}

const FETCH_QUOTE_QUERY = gql`
  query($quoteId: ID!) {
    getQuote(quoteId: $quoteId) {
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

export default SingleQuote
