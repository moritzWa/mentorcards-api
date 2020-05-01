import React from "react"
import { Button, Card, Icon, Label, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import moment from "moment"

function QuoteCard({
  quote: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  function likeQuote() {
    console.log("Like quote!!")
  }

  function commentOnQuote() {
    console.log("Comment on quote!!")
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          wrapped
          src="https://www.skmurphy.com/wp-content/uploads/2017/11/kkNavalRavikant110222-e1530507117593.jpg"
        />
        <p className="quote-text">
          <bold>“</bold>
          {body}
          <bold>”</bold>
        </p>
        <div
          style={{ display: "flex", alignContent: "center", height: "23px" }}
        >
          <h5>added by {username}</h5>
          <Card.Meta as={Link} to={`/quotes/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
        </div>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likeQuote}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnQuote}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  )
}

export default QuoteCard
