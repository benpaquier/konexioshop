import { createContext, useEffect, useState } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_CHECKOUT, ADD_TO_CHECKOUT, REMOVE_ITEM } from "../graphql/mutations"
import { GET_CHECKOUT } from "../graphql/queries"

const CheckoutContext = createContext({})

const CheckoutProvider = ({ children, client }) => {
  const [checkout, setCheckout] = useState(null)

  useEffect(() => {
    const checkoutId = localStorage.getItem("checkoutId")

    if (checkoutId) {
      client.query({
        query: GET_CHECKOUT,
        variables: {
          id: checkoutId
        }
      }).then(response => setCheckout(response.data.node))
    } else {
      client.mutate({
        mutation: CREATE_CHECKOUT,
        variables: {
          input: {}
        }
      }).then(response => {
        localStorage.setItem("checkoutId", response.data.checkoutCreate.checkout.id)
        setCheckout(response.data.checkoutCreate.checkout)
      })

    }
  }, [])

  const addToCheckout = product => {
    client.mutate({
      mutation: ADD_TO_CHECKOUT,
      variables: {
        lineItems: [
          {
            quantity: 1,
            variantId: product.node.variants.edges[0].node.id
          }
        ],
        checkoutId: checkout.id
      }
    }).then(response => {
      setCheckout(response.data.checkoutLineItemsAdd.checkout)
    })
  }

  const removeItem = item => {
    client.mutate({
      mutation: REMOVE_ITEM,
      variables: {
        lineItemIds: [
          item.node.id
        ],
        checkoutId: checkout.id
      }
    }).then(response => {
      setCheckout(response.data.checkoutLineItemsRemove.checkout)
    })
  }

  const value = {
    checkout,
    addToCheckout,
    removeItem
  }

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}

export {
  CheckoutContext,
  CheckoutProvider
}