import { gql, graphql } from '@apollo/react-hoc'

export const customerAccessTokenCreate = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`

export default graphql(customerAccessTokenCreate, {
  name: 'customerAccessTokenCreate',
  alias: 'withcustomerAccessTokenCreate',
})
