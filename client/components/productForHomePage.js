import React from 'react'
import {Link} from 'react-router-dom'

export const ProductForHomePage = props => {
  return (
    <div className="product-homepage">
      <Link className="link" to={`/products/${props.product.id}`}>
        <img src={props.product.imageUrl} />
      </Link>
      <div>
        <Link className="link" to={`/products/${props.product.id}`}>
          <h5>{props.product.title}</h5>
        </Link>
        <h4>{props.product.price}</h4>
      </div>
    </div>
  )
}
