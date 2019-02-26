import React from 'react'

export const ProductForHomePage = props => {
  return (
    <div>
      <img src={props.product.imageUrl} />
      <h5>{props.product.title}</h5>
      <h4>{props.product.price}</h4>
    </div>
  )
}
