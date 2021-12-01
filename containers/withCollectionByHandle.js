import { gql, graphql } from '@apollo/react-hoc'

const collectionByHandle = gql`
  query collectionByHandleQuery($handle: String!) {
    shop {
      collectionByHandle(handle: $handle) {
        title
        descriptionHtml
        image(maxWidth: 2000) {
          transformedSrc
        }
        products(first: 36) {
          edges {
            node {
              id
              title
              handle
              images(first: 1, maxWidth: 800) {
                edges {
                  node {
                    src
                  }
                }
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount
                    }
                    compareAtPriceV2 {
                      amount
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const filter = collection => ({
  ...collection,
  products: { edges: collection?.products?.edges },
})

const withCollectionByHandle = (handle, { filterUnavailable }) =>
  graphql(collectionByHandle, {
    alias: 'withCollectionByHandle',

    props: ({ data: { shop }, loading }) => {
      // eslint-disable-next-line
      const collection = !shop
        ? {}
        : filterUnavailable
        ? filter(shop.collectionByHandle)
        : shop.collectionByHandle

      return {
        collection,
        isCollectionLoading: loading,
      }
    },

    options(props) {
      return {
        variables: {
          handle: handle instanceof Function ? handle(props) : handle,
        },
      }
    },
  })

export default withCollectionByHandle
