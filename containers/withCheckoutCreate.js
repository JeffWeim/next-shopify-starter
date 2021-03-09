/*
  Mutation query HoC that creates a new checkout object
*/
import { gql, graphql } from '@apollo/react-hoc'

import CheckoutFragment from './inc/CheckoutFragment'

export const checkoutCreate = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
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

export default graphql(checkoutCreate, {
  name: 'checkoutCreate',
  alias: 'withCheckoutCreate',
})
