import { compose } from 'recompose'
import { withRouter } from 'next/router'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import withCollectionByHandle from '../containers/withCollectionByHandle'

import ProductList from '../components/store/ProductList'
import PaddedView from '../components/PaddedView'

const Store = props => {
  const { collection, isCollectionLoading } = props

  return (
    <PaddedView>
      <Section>
        <Head>
          <title>{collection?.title || 'Store'}</title>
        </Head>

        <h1>{collection?.title}</h1>

        <h2>{collection && collection.descriptionHtml}</h2>

        <br />

        <ProductList
          products={collection?.products}
          loading={isCollectionLoading}
        />
      </Section>
    </PaddedView>
  )
}

const Section = styled.section``

Store.defaultProps = {
  isCollectionLoading: false,
}

Store.propTypes = {
  collection: PropTypes.objectOf(PropTypes.any).isRequired,
  isCollectionLoading: PropTypes.bool,
}

// Store.getInitialProps = async ({ req }) => {
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
  withCollectionByHandle(({ router }) => router?.query?.handle || 'frontpage', {
    filterUnavailable: true,
  }),
)(Store)
