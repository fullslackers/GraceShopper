import React from 'react'
import {Link} from 'react-router-dom'

export const ProductForHomePage = props => {
  return (
    <div>
      <img src={props.product.imageUrl} />
      <h5>{props.product.title}</h5>
      <h4>{props.product.price}</h4>
      <Link to={`/products/${props.product.id}`}>LINK</Link>
    </div>
  )
}
