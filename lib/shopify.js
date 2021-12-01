import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

export default withApollo(
  // eslint-disable-next-line
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME}.myshopify.com/api/2021-10/graphql.json`,
      cache: new InMemoryCache().restore(initialState || {}),
      headers: {
        'X-Shopify-Storefront-Access-Token':
          process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
        Accept: 'application/graphql',
      },
    }),
)
