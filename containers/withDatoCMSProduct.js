import { gql, graphql } from '@apollo/react-hoc'

const product = gql`
  query($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        availableForSale
        title
        handle
        variants(first: 100) {
          edges {
            node {
              price
              compareAtPrice
              available
              image {
                src
              }
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              src
              originalSrc
              height
              altText
              width
            }
          }
        }
      }
    }
  }
`

const withDatoCMSProduct = handleFn => graphql(product, {
    alias: 'withDatoCMSProduct',

    options(props) {
      const ids = props.data.carousel.products.map(p => p.product)

      return {
        variables: {
          ids,
        },
      }
    },

    props: ({ data: { nodes: products } }) => ({
      products,
    }),
  })

export default withDatoCMSProduct
