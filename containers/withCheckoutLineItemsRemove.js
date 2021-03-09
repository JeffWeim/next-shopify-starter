/*
  Mutation query HoC that creates a new checkout object
*/
import { gql, graphql } from '@apollo/react-hoc'

import CheckoutFragment from './inc/CheckoutFragment'

export const checkoutLineItemsRemove = gql`
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`

export default graphql(checkoutLineItemsRemove, {
  name: 'checkoutLineItemsRemove',
  alias: 'withCheckoutLineItemsRemove',
})
