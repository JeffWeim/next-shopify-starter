import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Price from 'components/Price'

const CartPrice = function(props) {
  const { checkout } = props

  return (
    <div className="CartPrice">
      <table>
        <tbody>
          {checkout.availableShippingRates &&
            checkout.availableShippingRates.shippingRates &&
            checkout.availableShippingRates.shippingRates.length && (
              <tr>
                <TableData>
                  <span>Shipping: </span>
                </TableData>
                <TableData>
                  <Price
                    value={
                      checkout.availableShippingRates.shippingRates[0].priceV2
                        .amount
                    }
                  />
                </TableData>
              </tr>
            )}

          {!!parseInt(checkout.totalTax, 10) && (
            <tr>
              <TableData>
                <span>Taxes:</span>
              </TableData>
              <TableData>
                <Price value={checkout.totalTax} />
              </TableData>
            </tr>
          )}
          <Total>
            <TableData>
              <span>Total:</span>
            </TableData>
            <TableData>
              <Price id="total" value={checkout.totalPrice} />
            </TableData>
          </Total>
        </tbody>
      </table>
    </div>
  )
}

const TableData = styled.td`
  &:last-child {
    text-align: right;
  }
`

const Total = styled.tr`
  ${TableData} {
    font-size: 1.25em;
    font-weight: 600;
  }
`

CartPrice.propTypes = {
  checkout: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default CartPrice
