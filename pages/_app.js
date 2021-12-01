import PropTypes from 'prop-types'
import React from 'react'
import Router, { withRouter } from 'next/router'
import styled, { ThemeProvider } from 'styled-components'
import withGA from 'next-ga'
import { ApolloProvider } from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useStore } from 'react-redux'
import { compose, withProps } from 'recompose'
import { motion } from 'framer-motion'

import Progress from 'components/navigation/Progress'

import theme from '../theme'

import { wrapper } from '../lib/redux'
import withShopify from '../lib/shopify'

import Head from '../components/Head'
import Footer from '../components/Footer'
import Header from '../components/Header'

import withOpenDrawer from '../containers/withOpenDrawer'

const App = function (props) {
  const { Component, pageProps, apollo, router } = props
  const store = useStore()

  return (
    <>
      <Progress theme={theme} />
      <Head />
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <ApolloProvider client={apollo}>
            <ThemeProvider theme={theme}>
              <Header />

              <Main
                key={router.route}
                initial="pageInitial"
                animate="pageAnimate"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                    },
                  },
                }}
              >
                {/* eslint-disable-next-line */}
                <Component {...pageProps} key={router.route} />
              </Main>

              <Footer />
            </ThemeProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

const Main = styled(motion.main)`
  min-height: calc(100vh - 47px);
`

App.defaultProps = {
  pageProps: null,
}

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.any]).isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any),
  apollo: PropTypes.objectOf(PropTypes.any).isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired,
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}

  return { pageProps }
}

export default compose(
  withShopify, // this is withApollo
  withRouter,
  withGA('UA-62942263-12', Router),
  wrapper.withRedux,
  withOpenDrawer,
  withProps(({ openDrawer }) => ({
    isCartOpen: openDrawer === 'CART',
    isMenuOpen: openDrawer === 'MENU',
  })),
)(App)
