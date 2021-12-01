import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const Progress = function () {
  // eslint-disable-next-line
  return <></>
}

export default Progress
