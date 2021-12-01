import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const withAuth = Component =>
  // eslint-disable-next-line
  function (props) {
    // eslint-disable-next-line
    const { isAuthenticated } = props

    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) router.push('/auth')
    }, [isAuthenticated])

    return <Component {...props} />
  }

export default withAuth
