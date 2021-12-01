import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'components/Grid'

import ProductTile from './ProductTile'

const ProductListLoading = function () {
  return (
    <>
      <ProductTile product={{}} key={1} />
      <ProductTile product={{}} key={2} />
      <ProductTile product={{}} key={3} />
    </>
  )
}

const ProductList = function (props) {
  const { products, loading } = props

  return (
    <Grid
      className="ProductList"
      template="repeat(auto-fit, minmax(220px, 1fr))"
    >
      {loading ? (
        <ProductListLoading />
      ) : (
        products?.edges.map(product => (
          <ProductTile product={product.node} key={product.node.id} />
        ))
      )}
    </Grid>
  )
}

ProductList.defaultProps = {
  loading: false,
  products: null,
}

ProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.objectOf(PropTypes.any),
}

export default ProductList
