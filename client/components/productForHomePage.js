import React from 'react'
import {Link} from 'react-router-dom'
import {
  Card,
  Container,
  Button,
  Image,
  Icon,
  Divider,
  Popup
} from 'semantic-ui-react'

const styles = {
  text: {
    textAlign: 'center'
  },
  margin: {
    margin: '0.5em'
  }
}

export const ProductForHomePage = props => {
  return (
    <React.Fragment>
      <Card key={props.product.id} style={props.style}>
        <Link className="link" to={`/products/${props.product.id}`}>
          <Image size="medium" src={props.product.imageUrl} />
        </Link>
        <div>
          <Card.Content style={styles.text}>
            <Link className="link" to={`/products/${props.product.id}`}>
              <Card.Header style={styles.margin} as="h3">
                {props.product.title}
              </Card.Header>
            </Link>

            <Divider hidden />
            <Card.Content extra>
              <Card.Description style={styles.margin} as="h4">
                ${props.product.price}
              </Card.Description>
            </Card.Content>
          </Card.Content>
        </div>
      </Card>
    </React.Fragment>
  )
}
