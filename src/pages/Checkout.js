import React, { useContext } from 'react'

import { CheckoutContext } from '../contexts/Checkout'
import Product from '../components/Product'
import { Link } from 'react-router-dom'

const Checkout = () => {
  const { checkout, removeItem } = useContext(CheckoutContext)

  if (!checkout) {
    return (
      <p>Panier vide</p>
    )
  }

  return (
    <div>
      <h2>Total: {checkout.lineItemsSubtotalPrice.amount}$</h2>
      {checkout.lineItems.edges.map(item => (
        <div>
          <h3>{item.node.title}</h3>
          <p>quantity: {item.node.quantity} x {item.node.variant.priceV2.amount}$</p>
          <button onClick={() => removeItem(item)}>Remove item</button>
        </div>
      ))}

      <a href={checkout.webUrl} target="_blank">Proceder au paiement</a>
    </div>
  )
}

export default Checkout