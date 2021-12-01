import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'

import ProductPrice from 'components/store/ProductPrice'

import { HideOnDesktop, HideOnMobile } from '../HideOn'

import ProductImage from './ProductImage'
import ProductForm from './ProductForm'

const ProductInfo = function(props) {
  const { product, selectedVariant } = props

  const [availableVariants, setAvailableVariants] = useState(product?.variants)

  return (
    <ProductInfoBase>
      <div>
        {product?.variants && (
          <ProductImage
            src={
              availableVariants
                ? availableVariants.edges[0]?.node?.image?.src
                : product.variants.edges[0]?.node?.image?.src
            }
          />
        )}
        <HideOnMobile>
          {product?.images?.edges?.map(
            (image, i) =>
              !product.variants.edges.find(
                variant => image.node.src === variant.node.image.src,
              ) && <ProductImage src={image.node.src} key={i} />,
          )}
        </HideOnMobile>
      </div>
      <div>
        <h1>{product?.title}</h1>

        <ProductPrice
          product={product}
          variant={selectedVariant}
          showInstallment
          selectedVariant={availableVariants}
        />

        <hr />

        <ProductForm
          product={product}
          selectedVariant={availableVariants}
          startingVariant={selectedVariant}
          availableVariants={availableVariants}
          onVariantSelect={setAvailableVariants}
        />
        <div dangerouslySetInnerHTML={{ __html: product?.descriptionHtml }} />
        <br />
        <HideOnDesktop>
          {product?.images?.edges?.map(
            (image, i) =>
              !product?.variants?.edges.find(
                variant => image.node.src === variant.node.image.src,
              ) && <ProductImage src={image.node.src} key={i} />,
          )}
        </HideOnDesktop>
      </div>
    </ProductInfoBase>
  )
}

const ProductInfoBase = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;

    > div {
      flex: 1;

      &:first-child {
        flex: 1.61;
        padding-right: 2em;
      }
    }
  }
`

ProductInfo.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedVariant: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default compose(
  withProps(({ product, availableVariants }) => ({
      selectedVariant:
        product?.variants?.edges[0] || availableVariants?.edges[0],
    })),
)(ProductInfo)
