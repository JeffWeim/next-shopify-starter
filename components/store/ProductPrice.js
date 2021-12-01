import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'

import Price from 'components/Price'

const ProductPrice = function(props) {
  const { baseValue, maxValue, compareAt, selectedVariant } = props

  return (
    <ProductPriceBase>
      {selectedVariant?.edges?.length === 1 ? (
        <>
          {selectedVariant.edges[0].node?.compareAtPriceV2 && (
            <Compare>
              <Price
                value={selectedVariant.edges[0].node.compareAtPriceV2.amount}
              />
            </Compare>
          )}

          <Max compareAt={selectedVariant.edges[0].node?.compareAtPriceV2}>
            <Price value={selectedVariant.edges[0].node.priceV2.amount} />
          </Max>
        </>
      ) : (
        <>
          {compareAt && (
            <Compare>
              <Price value={compareAt} />
            </Compare>
          )}

          <Min compareAt={compareAt}>
            <Price value={baseValue} />
          </Min>

          {maxValue && (
            <Max compareAt={compareAt}>
              {' - '} <Price value={maxValue} />
            </Max>
          )}
        </>
      )}
    </ProductPriceBase>
  )
}

const Compare = styled.span`
  text-decoration: line-through;
  margin-right: 0.5em;
`

const Min = styled.span`
  color: ${({ compareAt, theme }) =>
    compareAt ? theme.colors.red : 'inherit'};
  font-weight: ${({ compareAt }) => (compareAt ? '700' : '')};
`

const Max = styled.span`
  color: ${({ compareAt, theme }) =>
    compareAt ? theme.colors.red : 'inherit'};
  font-weight: ${({ compareAt }) => (compareAt ? '700' : '')};
`

const ProductPriceBase = styled.div`
  color: #000;
`

ProductPrice.defaultProps = {
  selectedVariant: {},
}

ProductPrice.propTypes = {
  baseValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  maxValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  compareAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  selectedVariant: PropTypes.objectOf(PropTypes.any),
}

export default compose(
  withProps(({ product, variant }) => {
    const prices =
      product.variants &&
      product.variants.edges.map(
        ({
          node: {
            priceV2: { amount },
          },
        }) => amount,
      )

    const comparePrices = product.variants.edges
      .map(
        ({ node: { compareAtPriceV2 } }) =>
          compareAtPriceV2 && compareAtPriceV2.amount,
      )
      .filter(Boolean)

    const minPrice = Math.min.apply(null, prices)
    const maxPrice = Math.max.apply(null, prices)
    const minCompare =
      !!comparePrices.length && Math.min.apply(null, comparePrices)

    const selectedPrice = variant && variant.node.priceV2.amount
    const selectedCompare =
      variant &&
      variant.node.compareAtPriceV2 &&
      variant.node.compareAtPriceV2.amount

    return {
      baseValue: selectedPrice || minPrice,
      maxValue: minPrice !== maxPrice && !selectedPrice && maxPrice,
      compareAt: selectedCompare || minCompare,
    }
  }),
)(ProductPrice)
