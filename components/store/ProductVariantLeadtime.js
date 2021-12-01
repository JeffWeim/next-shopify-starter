import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import { compose, withState, lifecycle, withProps } from 'recompose'

const getVariantLeadtime = async variantId => {
  const response = await fetch(`/api/store/leadtime?variantId='${variantId}`)
  const leadtime = await response.json()

  return leadtime
}

const ProductVariantLeadtime = function (props) {
  const { quantity, loading } = props

  if (quantity && loading) return null

  return (
    // eslint-disable-next-line
    <>
      {typeof quantity === 'number' && quantity <= 2 ? (
        <p>Only a few left in stock, order soon!</p>
      ) : null}
    </>
  )
}

ProductVariantLeadtime.defaultProps = {
  quantity: null,
}

ProductVariantLeadtime.propTypes = {
  loading: PropTypes.bool.isRequired,
  quantity: PropTypes.number,
}

export default compose(
  withState('loading', 'setLoading', false),
  withState('leadtime', 'setLeadtime', null),
  withState('quantity', 'setQuantity', null),
  lifecycle({
    async shouldComponentUpdate(nextProps) {
      if (nextProps.variant.node.id !== this.props.variant.node.id) {
        this.props.setLoading(true)

        const response = await getVariantLeadtime(nextProps.variant.node.id)

        this.props.setLoading(false)
        this.props.setLeadtime(response.leadTime)
        this.props.setQuantity(response.quantity)
      }
    },
  }),
  withProps(({ leadtime, quantity, loading }) => {
    let leadText
    if (loading) leadText = 'Calculating...'

    if (leadtime === 0) {
      leadText = 'Available for immediate shipment.'
    } else {
      leadText = `Available to ship in ${leadtime} days.`
    }

    return { leadText, quantity }
  }),
)(ProductVariantLeadtime)
