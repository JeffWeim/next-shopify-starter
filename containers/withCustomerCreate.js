import { gql, graphql } from '@apollo/react-hoc'

export const customerCreate = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export default graphql(customerCreate, {
  name: 'customerCreate',
  alias: 'withCustomerCreate',
})
