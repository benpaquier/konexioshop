import { gql } from '@apollo/client'

export const GET_CHECKOUT = gql`
  query GetCheckout($id: ID!) {
    node(id: $id) {
      id
      ... on Checkout {
        webUrl
        id
        lineItemsSubtotalPrice {
          amount
        }
        lineItems(first: 50) {
          edges {
            node {
              id
              title
              quantity
              variant {
                priceV2 {
                  amount
                }
              }              
            }
          }
        }
      }
    }
  }
`