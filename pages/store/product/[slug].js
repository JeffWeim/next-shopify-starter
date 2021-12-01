import { compose } from 'recompose'
import { withRouter } from 'next/router'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'

import ProductInfo from '../../../components/store/ProductInfo'
import PaddedView from '../../../components/PaddedView'

import withProduct from '../../../containers/withProduct'

const ProductPage = function(props) {
  const { product, isProductLoading } = props

  return (
    <PaddedView>
      <Head>
        <title>{product?.title || 'Product'}</title>
      </Head>

      {!isProductLoading && <ProductInfo product={product} />}
    </PaddedView>
  )
}

ProductPage.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  isProductLoading: PropTypes.bool.isRequired,
}

// ProductPage.getInitialProps = async ({ req }) => {
//   const api = await getPrismic(req)
//   const { results } = await api.query(
//     Predicates.at('document.type', 'blog_post'),
//     {
//       pageSize: 30,
//       orderings: '[my.blog_post.post_date desc]',
//     },
//   )
//   return { highlight: results[0] }
// }

export default compose(
  withRouter,
  withProduct(({ router }) => 
    // console.log(`selected product id: ${router?.query?.id}`)
     router?.query?.handle || router?.query?.slug || ''
  ),
)(ProductPage)
