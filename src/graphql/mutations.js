import { gql } from '@apollo/client'

export const CREATE_CHECKOUT = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      queueToken
    }
  }
`

export const ADD_TO_CHECKOUT = gql`
  mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
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
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const REMOVE_ITEM = gql`
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkout {
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
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }

`