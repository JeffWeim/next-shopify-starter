/*
  Query to get Checkout object
*/
import { gql, graphql } from '@apollo/react-hoc'
import { compose } from 'recompose'

import withCustomerAccessToken from './withCustomerAccessToken'

const customer = gql`
  query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      email
      phone
      defaultAddress {
        firstName
        lastName
        address1
        address2
        city
        provinceCode
        zip
        country
      }
      createdAt
      acceptsMarketing
      orders(first: 1, reverse: true) {
        edges {
          node {
            id
            name
            orderNumber
            statusUrl
            totalPrice
            customerUrl
          }
        }
      }
    }
  }
`
export default compose(
  withCustomerAccessToken,
  graphql(customer, {
    alias: 'withCustomerAccessToken',
    options: props => ({
      variables: {
        customerAccessToken: props.customerAccessToken.accessToken,
      },
    }),
    // eslint-disable-next-line
    props({ data: { customer } }) {
      return { customer }
    },
  }),
)
