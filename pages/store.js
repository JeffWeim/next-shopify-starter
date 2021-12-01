import { compose } from 'recompose'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'

import withProductList from '../containers/withProductList'

import ProductList from '../components/store/ProductList'
import PaddedView from '../components/PaddedView'

const Store = function (props) {
  const { isCollectionLoading, data } = props

  return (
    <PaddedView>
      <section>
        <ProductList products={data?.products} loading={isCollectionLoading} />
      </section>
    </PaddedView>
  )
}

Store.defaultProps = {
  isCollectionLoading: false,
}

Store.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isCollectionLoading: PropTypes.bool,
}

export default compose(
  withRouter,
  // withCollectionByHandle(({ router }) => router?.query?.handle || 'frontpage', {
  //   filterUnavailable: true,
  // }),
  withProductList,
)(Store)
