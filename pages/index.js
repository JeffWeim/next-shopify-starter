import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/react-hoc'

import { request } from '../lib/datocms'

// data from DatoCMS
const HOMEPAGE_QUERY = `
  query {
    carousel {
      products {
        product
        createdAt
        _status
      }
    }
  }
`

// data from Shopify
const PRODUCTS_QUERY = gql`
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

/**
 * This file demonstrates how you can create layouts in a CMS like DatoCMS using your stores products. This file queries DatoCMS first,
 * then takes those product id's and queries shopify for a complete set of product data
 */
const HomePage = function(props) {
  const {
    data: {
      carousel: { products: datoProducts },
    },
  } = props
  const [products, setProducts] = useState(null)

  // eslint-disable-next-line
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: {
      ids: datoProducts.map(p => p.product),
    },
  })

  useEffect(() => {
    setProducts(data?.nodes)
  }, [data])

  if (loading) return <p>Loading ...</p>

  return (
    <Section>
      <h1>Featured Products</h1>

      <Grid>
        {products &&
          products.map((product, index) => (
            <Product
              key={index.toString()}
              href={`/store/product/${product?.handle}`}
            >
              <a>
                <h2>{product?.title}</h2>

                <ProductImage
                  src={product?.images?.edges[0].node.src}
                  alt={product?.images?.edges[0].node.alt}
                />
              </a>
            </Product>
          ))}
      </Grid>
    </Section>
  )
}

const Section = styled.section`
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px 10px;
  grid-template-areas: '. .';
`

const Product = styled(Link)`
  width: auto;
`

const ProductImage = styled.img`
  max-width: 500px;
  width: 100%;
`

HomePage.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}

HomePage.getInitialProps = async ({ req }) => {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
  })

  return {
    data,
  }
}

export default HomePage
