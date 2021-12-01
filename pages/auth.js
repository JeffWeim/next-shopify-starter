import { compose } from 'recompose'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import withCustomerAccessToken from '../containers/withCustomerAccessToken'
import withCustomerCreate from '../containers/withCustomerCreate'
import withCustomerAccessTokenCreate from '../containers/withCustomerAccessTokenCreate'

import PaddedView from '../components/PaddedView'
import UserAuth from '../components/user/UserAuth'

const AuthPage = function(props) {
  const { customerAccessTokenCreate, customerAccessToken, dispatch } = props
  const router = useRouter()

  useEffect(() => {
    if (customerAccessToken?.accessToken) router.push('/user')
  }, [customerAccessToken?.accessToken])

  return (
    <PaddedView>
      <UserAuth
        customerAccessTokenCreate={customerAccessTokenCreate}
        customerAccessToken={customerAccessToken}
        dispatch={dispatch}
      />
    </PaddedView>
  )
}

AuthPage.propTypes = {
  customerAccessTokenCreate: PropTypes.func.isRequired,
  customerAccessToken: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default compose(
  withCustomerAccessToken,
  withCustomerAccessTokenCreate,
  withCustomerCreate,
)(AuthPage)
