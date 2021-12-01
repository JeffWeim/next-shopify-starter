import { compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import withCheckoutId from 'containers/withCheckoutId'
import withCheckoutLineItemsUpdate from 'containers/withCheckoutLineItemsUpdate'

import Price from 'components/Price'
import ProductImage from 'components/store/ProductImage'

const CartItem = function(props) {
  const { item, handleMoreClick, handleLessClick } = props

  return (
    <tr key={item.node.title}>
      <TableData>
        <ProductImage src={item?.node?.variant?.image?.src} alt="" />
        <StyledSpan>{item.node.quantity}</StyledSpan>
      </TableData>
      <TableData isQuantity>
        <StyledAnchor onClick={() => handleMoreClick(item)}>+</StyledAnchor>
        <StyledAnchor onClick={() => handleLessClick(item)}>-</StyledAnchor>
      </TableData>
      <TableData isName>
        <div>{item.node.title}</div>
        <small>
          {item?.node?.variant?.title !== 'Default Title' &&
            item?.node?.variant?.title.replace(/\s*\[.*?\]/g, '')}
        </small>
      </TableData>
      <TableData>
        <Price value={item?.node?.variant?.price} />
      </TableData>
    </tr>
  )
}

const StyledSpan = styled.span`
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
`

const TableData = styled.td`
  &:first-child {
    width: 15%;
    padding-left: 0;
    position: relative;
    min-width: 64px;
  }

  &:last-child {
    text-align: right;
    padding-right: 0;
  }

  ${({ isName }) =>
    isName &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 1rem;
      font-weight: 600;
    `}

  ${({ isQuantity }) =>
    isQuantity &&
    css`
      min-width: 1.5em;
      font-weight: bold;
    `}
`

const StyledAnchor = styled.a`
  display: block;
  text-align: center;
`

CartItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  handleMoreClick: PropTypes.func.isRequired,
  handleLessClick: PropTypes.func.isRequired,
}

export default compose(
  withCheckoutId,
  withCheckoutLineItemsUpdate,
  withHandlers({
    handleMoreClick: ({
      checkoutLineItemsUpdate,
      checkoutId,
    }) => async item => {
      await checkoutLineItemsUpdate({
        variables: {
          checkoutId,
          lineItems: [
            {
              quantity: parseInt(item.node.quantity + 1, 10),
              id: item.node.id,
            },
          ],
        },
      })
    },
    handleLessClick: ({
      checkoutLineItemsUpdate,
      checkoutId,
    }) => async item => {
      await checkoutLineItemsUpdate({
        variables: {
          checkoutId,
          lineItems: [
            {
              quantity: parseInt(item.node.quantity - 1, 10),
              id: item.node.id,
            },
          ],
        },
      })
    },
  }),
)(CartItem)
