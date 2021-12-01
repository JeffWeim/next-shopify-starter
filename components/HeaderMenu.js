import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import styled from 'styled-components'

import { toggleDrawer } from '../lib/redux'

import withCheckout from '../containers/withCheckout'
import withOpenDrawer from '../containers/withOpenDrawer'

import SvgIcon from './SvgIcon'

const HeaderMenu = function(props) {
  const { checkout, handleCartClick, handleMenuClick } = props

  const [count, setCount] = useState(null)

  useEffect(() => {
    setCount(
      checkout?.lineItems?.edges.length
        ? checkout?.lineItems?.edges
            .flatMap(({ node }) => node.quantity)
            .reduce((sum, item) => sum + item)
        : null,
    )
  }, [checkout?.lineItems?.edges])

  return (
    <HeaderMenuBase>
      <Menu>
        <Button
          onClick={handleMenuClick}
          onKeyPress={e => (e.keyCode === 13 ? handleMenuClick() : undefined)}
        >
          <SvgIcon type="menu" />
        </Button>
      </Menu>

      <Cart>
        <Button
          onClick={handleCartClick}
          onKeyPress={e => (e.keyCode === 13 ? handleCartClick() : undefined)}
        >
          <Count checkout={checkout}>{count}</Count>
          <SvgIcon type="cart" />
        </Button>
      </Cart>
    </HeaderMenuBase>
  )
}

const Button = styled.button`
  -webkit-appearance: none;
  background: none;
  border: none;
  cursor: pointer;
`

const Count = styled.div`
  transition: 0.5s all;
  position: absolute;
  top: -9px;
  right: -9px;
  background: ${({ theme }) => theme.colors.blue};
  border-radius: 1em;
  width: 24px;
  height: 24px;
  line-height: 1.75em;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  opacity: 1;
  opacity: ${({ checkout }) =>
    checkout?.lineItems?.edges.length >= 1 ? 1 : 0};
`

const Cart = styled.div`
  position: relative;
`

const HeaderMenuBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const Menu = styled.div`
  margin: 0 15px 0 0;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`

HeaderMenu.defaultProps = {
  checkout: {},
}

HeaderMenu.propTypes = {
  checkout: PropTypes.objectOf(PropTypes.any),
  handleCartClick: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
}

export default compose(
  withOpenDrawer,
  withHandlers({
    handleMenuClick: ({ dispatch }) => () => dispatch(toggleDrawer('MENU')),
    handleCartClick: ({ dispatch }) => () => dispatch(toggleDrawer('CART')),
  }),
  withCheckout,
)(HeaderMenu)
