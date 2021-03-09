import { gql, graphql } from '@apollo/react-hoc'

const shop = gql`
  query shopQuery {
    shop {
      moneyFormat
      privacyPolicy {
        body
        title
        url
      }
      refundPolicy {
        body
        title
        url
      }
      termsOfService {
        body
        title
        url
      }
    }
  }
`

export default graphql(shop, {
  alias: 'withShop',

  // eslint-disable-next-line
  props: ({ data: { shop }, loading }) => ({
    shop,
    isShopLoading: loading,
  }),
})
