import React from 'react'
import { Formik } from 'formik'

import Button from '../Button'

const UserRegisterForm = function(props) {
  return (
    <Formik initialValues={{ email: '', password: '' }} {...props}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        error,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values && values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={error && error.email && 'error'}
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              value={values && values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={error && error.password && 'error'}
            />
          </label>

          <Button action type="submit" loading={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default UserRegisterForm
