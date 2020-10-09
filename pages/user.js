import React from 'react'

import { compose } from 'recompose'

import withCustomer from '../containers/withCustomer'
import withAuthenticatedCustomer from '../containers/withAuthenticatedCustomer'
import withAuth from '../containers/withAuth'

import PaddedView from '../components/PaddedView'

const UserPage = () => {
  return (
    <PaddedView>
      <h1>Welcome</h1>

      <p>You&apos;re viewing an authenticated user info page.</p>
    </PaddedView>
  )
}

export default compose(
  withCustomer,
  withAuthenticatedCustomer,
  withAuth,
)(UserPage)
