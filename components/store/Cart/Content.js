import React from 'react'
import PropTypes from 'prop-types'
import { compose, branch, renderComponent } from 'recompose'
import styled from 'styled-components'

import CartItem from 'components/store/Cart/Item'
import CartPrice from 'components/store/Cart/Price'
import Button from 'components/Button'

const Content = function({ checkout }) {
  return <Section>
    <h1>Cart</h1>

    <Items>
      <Table>
        <tbody>
          {checkout &&
            checkout.lineItems.edges.map(item => (
              <CartItem key={item?.node?.variant?.id} item={item} />
            ))}
        </tbody>
      </Table>
    </Items>

    <hr />

    <div className="price">
      <CartPrice checkout={checkout} />
    </div>

    <Footer>
      <small />
      <Button primary onClick={() => window.location.replace(checkout.webUrl)}>
        Checkout
      </Button>
    </Footer>
  </Section>
}

const Footer = styled.div`
  padding-top: 1em;
  align-self: flex-start;
`

const Items = styled.div`
  flex: 1;
  overflow: auto;
  min-height: 0;
  max-width: 100%;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Table = styled.table`
  border-spacing: 0 1rem;
`

Content.propTypes = {
  checkout: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default compose(
  branch(
    ({ checkout }) => checkout && !checkout.lineItems.edges.length,
    renderComponent(props => <div>Your shopping cart is currently empty.</div>),
  ),
  branch(
    ({ checkout, loading }) => !checkout,
    renderComponent(props => <div>Loading...</div>),
  ),
)(Content)
