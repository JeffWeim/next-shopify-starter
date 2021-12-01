import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'

import { toggleDrawer } from '../../lib/redux'

import withCheckoutId from '../../containers/withCheckoutId'
import withCheckoutLineItemsAdd from '../../containers/withCheckoutLineItemsAdd'

import Button from '../Button'

import ProductVariantLeadtime from './ProductVariantLeadtime'
import ProductVariantSelect from './ProductVariantSelect'

const ProductForm = function(props) {
  const {
    checkoutId,
    checkoutLineItemsAdd,
    dispatch,
    hasOptions,
    onVariantSelect,
    product,
    selectedVariant,
    startingVariant,
  } = props

  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false)

  const handleAddToCartClick = async () => {
    const variant = hasOptions
      ? selectedVariant?.edges[0]
      : product?.variants?.edges[0]

    setIsAddToCartLoading(true)

    await checkoutLineItemsAdd({
      variables: {
        checkoutId,
        lineItems: [
          {
            variantId: variant.node.id,
            quantity: 1,
          },
        ],
      },
    })

    setIsAddToCartLoading(false)
    dispatch(toggleDrawer('CART'))
  }

  // useEffect(() => {
  //   console.log(selectedVariant)
  // }, [selectedVariant])

  return (
    <ProductFormBase>
      {hasOptions && (
        <ProductVariantSelect
          product={product}
          onVariantSelect={onVariantSelect}
        />
      )}

      <Actions>
        <Button
          onClick={handleAddToCartClick}
          disabled={
            hasOptions ? !(selectedVariant?.edges?.length === 1) : false
          }
          loading={isAddToCartLoading}
          primary
        >
          {isAddToCartLoading ? 'Adding...' : 'Buy'}
        </Button>
      </Actions>

      {startingVariant && (
        <Leadtime>
          <ProductVariantLeadtime variant={selectedVariant?.edges[0]} />
        </Leadtime>
      )}
    </ProductFormBase>
  )
}

const Actions = styled.div`
  margin-bottom: 1rem;
`

const Leadtime = styled.div`
  margin-bottom: 1rem;
  font-weight: 700;
`

const ProductFormBase = styled.div``

ProductForm.propTypes = {
  checkoutId: PropTypes.string.isRequired,
  checkoutLineItemsAdd: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasOptions: PropTypes.bool.isRequired,
  onVariantSelect: PropTypes.func.isRequired,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedVariant: PropTypes.objectOf(PropTypes.any).isRequired,
  startingVariant: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default compose(
  withProps(({ product }) => ({
    hasOptions: product?.options[0].values.length > 1,
  })),
  withCheckoutLineItemsAdd,
  withCheckoutId,
)(ProductForm)
