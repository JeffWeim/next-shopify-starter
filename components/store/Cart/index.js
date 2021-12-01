import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import styled from 'styled-components'

import PaddedView from 'components/PaddedView'

import withCheckout from 'containers/withCheckout'
import CartContent from 'components/store/Cart/Content'

const Cart = function(props) {
  const { checkout, isCheckoutLoading } = props

  return (
    <PaddedView className="Cart">
      <CartBase>
        <CartContent checkout={checkout} loading={isCheckoutLoading} />
      </CartBase>
    </PaddedView>
  )
}

const CartBase = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0.5em 0;
`

Cart.defaultProps = {
  checkout: null,
  isCheckoutLoading: true,
}

Cart.propTypes = {
  checkout: PropTypes.objectOf(PropTypes.any),
  isCheckoutLoading: PropTypes.bool,
}

export default compose(withCheckout)(Cart)
