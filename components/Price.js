import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'

const Price = function(props) {
  const { formatedValue } = props

  return <span className="Price">{formatedValue}</span>
}

const intToUSD = n =>
  parseFloat(n).toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
  })

Price.propTypes = {
  formatedValue: PropTypes.string.isRequired,
}

export default compose(
  withProps(({ value }) => ({ formatedValue: intToUSD(value) })),
)(Price)
