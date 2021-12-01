import { gql, graphql } from '@apollo/react-hoc'

// Change this handle to whatever collection you'd like
const productList = gql`
  {
    products(first: 100) {
      edges {
        node {
          handle
          description
          variants(first: 50) {
            edges {
              node {
                priceV2 {
                  amount
                }
                compareAtPriceV2 {
                  amount
                }
                availableForSale
                id
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                altText
                height
                id
                width
                src
              }
            }
          }
          metafields(first: 50) {
            edges {
              node {
                value
                description
              }
            }
          }
        }
      }
    }
  }
`
const normalizeImage = ({ node: { src } }) => ({ src })

const normalizeProduct = ({ node: { images, variants, ...node } }) => ({
  ...node,
  price: variants.edges[0].node.price,
  variants: variants.edges,
  images: images.edges.map(normalizeImage),
})

const normalizeProps = ({
  data: {
    loading,
    shop: {
      collectionByHandle: { products },
    },
  },
}) => ({
  loading,
  products: products.edges.map(normalizeProduct),
})

export default graphql(productList, {
  alias: 'withProductList',
  props: props => (props.data.shop ? normalizeProps(props) : props),
})
