import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'

import ProductPrice from 'components/store/ProductPrice'

import ProductImage from './ProductImage'

const ProductTile = function (props) {
  const { product } = props

  return (
    <div className="ProductTile">
      <Link
        href="/store/product/[product.handle]"
        as={`/store/product/${product.handle}`}
      >
        <a>
          <ProductImage
            src={product.images && product?.images?.edges[0]?.node?.src}
          />
          <Title>{product.title}</Title>
          <ProductPrice
            product={product}
            variant={product?.variants?.edges[0]}
          />
        </a>
      </Link>
    </div>
  )
}

const Title = styled.h3`
  margin: 0.5rem 0 0;
  font-size: 1.25rem;
`

ProductTile.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default ProductTile
