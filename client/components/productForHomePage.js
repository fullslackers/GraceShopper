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

export const ProductForHomePage = props => {
  return (
    <React.Fragment>
      <Card key={props.product.id}>
        <Link className="link" to={`/products/${props.product.id}`}>
          <Image size="medium" src={props.product.imageUrl} />
        </Link>
        <div>
          <Card.Content>
            <Link className="link" to={`/products/${props.product.id}`}>
              <Card.Header centered="true" as="h3">
                {props.product.title}
              </Card.Header>
            </Link>

            <Divider hidden />
            <Card.Content centered="true" extra>
              <Card.Description as="h4">
                ${props.product.price}
              </Card.Description>
            </Card.Content>
          </Card.Content>
        </div>
      </Card>
    </React.Fragment>
  )
}
