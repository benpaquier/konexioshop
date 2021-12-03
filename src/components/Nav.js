import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CheckoutContext } from '../contexts/Checkout'

const Nav = () => {
  const { checkout } = useContext(CheckoutContext)

  return (
    <ul>
      <li>
        <Link to="/">Konexioshop</Link>
      </li>
      <li>
        <Link to="/products">Produits</Link>
      </li>
      <li>
        <Link to="/checkout">Votre panier {checkout ? `- ${checkout.lineItemsSubtotalPrice.amount}$` : ''}</Link>
      </li>
    </ul>
  )
}

export default Nav