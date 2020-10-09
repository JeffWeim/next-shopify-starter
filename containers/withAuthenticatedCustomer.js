import { connect } from 'react-redux'

const withAuthenticatedCustomer = connect(({ customerAccessToken }) => ({
  isAuthenticated: !!customerAccessToken,
}))

export default withAuthenticatedCustomer
