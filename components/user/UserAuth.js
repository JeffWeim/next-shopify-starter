import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

import { setCustomerAccessToken } from '../../lib/redux'

import withCustomerCreate from '../../containers/withCustomerCreate'
import withCustomerAccessTokenCreate from '../../containers/withCustomerAccessTokenCreate'

import UserLoginForm from './UserLoginForm'
import UserRegisterForm from './UserRegisterForm'

const UserAuth = function(props) {
  const { handleLoginSubmit, handleRegisterSubmit } = props

  return (
    <div className="UserAuth">
      <h1>Login</h1>
      <UserLoginForm onSubmit={handleLoginSubmit} />

      <h1>Register</h1>
      <UserRegisterForm onSubmit={handleRegisterSubmit} />
    </div>
  )
}

UserAuth.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  handleRegisterSubmit: PropTypes.func.isRequired,
}

export default compose(
  withCustomerCreate,
  withCustomerAccessTokenCreate,
  withHandlers({
    handleLoginSubmit: props => async input => {
      try {
        const tokenMutationResult = await props.customerAccessTokenCreate({
          variables: { input },
        })

        if (
          tokenMutationResult.data.customerAccessTokenCreate?.userErrors
            .length > 0
        )
          throw new Error(
            tokenMutationResult.data.customerAccessTokenCreate?.userErrors[0].message,
          )

        props.dispatch(
          setCustomerAccessToken(
            tokenMutationResult.data.customerAccessTokenCreate
              .customerAccessToken,
          ),
        )
      } catch (error) {
        console.error(error)
      }
    },
    handleRegisterSubmit: props => async input => {
      try {
        // const createMutationResult = await props.customerCreate({
        //   variables: { input },
        // })
        const tokenMutationResult = await props.customerAccessTokenCreate({
          variables: { input },
        })
        props.dispatch(
          setCustomerAccessToken(
            tokenMutationResult.data.customerAccessTokenCreate
              .customerAccessToken,
          ),
        )
      } catch (error) {
        console.error(error)
      }
    },
  }),
)(UserAuth)
