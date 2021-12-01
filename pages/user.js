import PropTypes from 'prop-types'
import React from 'react'
import { compose } from 'recompose'

import withCustomer from '../containers/withCustomer'
import withAuthenticatedCustomer from '../containers/withAuthenticatedCustomer'
import withAuth from '../containers/withAuth'

import PaddedView from '../components/PaddedView'

const UserPage = function(props) {
  const { customer } = props

  return (
    <PaddedView>
      <h1>
        {customer?.firstName ? customer.firstName : null}, Welcome to Your
        Account
      </h1>

      <p>You&apos;re viewing an authenticated user info page.</p>
    </PaddedView>
  )
}

UserPage.propTypes = {
  customer: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default compose(
  withCustomer,
  withAuthenticatedCustomer,
  withAuth,
)(UserPage)
