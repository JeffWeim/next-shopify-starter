import React from 'react'
import { compose, withProps, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { toggleDrawer } from '../lib/redux'
import withOpenDrawer from '../containers/withOpenDrawer'

import Cart from './store/Cart'
import HeaderDrawer from './HeaderDrawer'
import HeaderMenu from './HeaderMenu'
import MainMenu from './MainMenu'

const Header = function(props) {
  const { isCartOpen, isMenuOpen, handleContentClick } = props

  return (
    <>
      <HeaderDrawer visible={isCartOpen}>
        <Cart />
      </HeaderDrawer>

      <HeaderDrawer visible={isMenuOpen}>
        <MainMenu />
      </HeaderDrawer>

      <HeaderBase>
        <Inner>
          <Top>
            <Link href="/">
              <StyledAnchor>
                <svg
                  height="50"
                  viewBox="0 0 148 90"
                  style={{
                    transform: 'translateX(4%)',
                    shapeRendering: 'auto',
                  }}
                >
                  <path
                    d="M34.992 23.495h27.855v2.219H37.546v16.699h23.792v2.219H37.546v18.334h25.591v2.219H34.992v-41.69zm30.35 0h2.96l13.115 18.334 13.405-18.334L113.055.207 83.1 43.756l15.436 21.429H95.46L81.417 45.683 67.316 65.185h-3.018L79.85 43.756 65.343 23.495zm34.297 2.219v-2.219h31.742v2.219h-14.623v39.47h-2.554v-39.47H99.64zM.145 23.495h3.192l44.011 66.003L29.16 65.185 2.814 26.648l-.116 38.537H.145v-41.69zm130.98 38.801c-.523 0-.914-.405-.914-.928 0-.524.391-.929.913-.929.528 0 .913.405.913.929 0 .523-.385.928-.913.928zm2.508-2.443H135c.019.742.56 1.24 1.354 1.24.888 0 1.391-.535 1.391-1.539v-6.356h1.391v6.362c0 1.808-1.043 2.849-2.77 2.849-1.62 0-2.732-1.01-2.732-2.556zm7.322-.08h1.379c.118.853.95 1.395 2.149 1.395 1.117 0 1.937-.58 1.937-1.377 0-.685-.521-1.097-1.708-1.377l-1.155-.28c-1.62-.38-2.36-1.166-2.36-2.487 0-1.602 1.304-2.668 3.26-2.668 1.82 0 3.15 1.066 3.23 2.58h-1.354c-.13-.828-.85-1.346-1.894-1.346-1.1 0-1.832.53-1.832 1.34 0 .642.472 1.01 1.64 1.284l.987.243c1.838.43 2.596 1.178 2.596 2.53 0 1.72-1.33 2.799-3.453 2.799-1.987 0-3.323-1.029-3.422-2.637z"
                    fill="#000"
                    fillRule="nonzero"
                  />
                </svg>
              </StyledAnchor>
            </Link>

            <Link href="/store">
              <a>Store</a>
            </Link>
          </Top>

          <HeaderMenu />
        </Inner>
      </HeaderBase>

      <AnimatePresence>
        {isCartOpen && (
          <Background
            key="background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05, ease: 'easeInOut', duration: 0.3 }}
            onClick={handleContentClick}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const Background = styled(motion.div)`
  background: black;
  content: '';
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  cursor: pointer;
`

const HeaderBase = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
`

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Inner = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StyledAnchor = styled.a`
  margin: 0 15px 0 0;
`

Header.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  isCartOpen: PropTypes.bool.isRequired,
  handleContentClick: PropTypes.func.isRequired,
}

export default compose(
  withOpenDrawer,
  withProps(({ openDrawer }) => ({
    isCartOpen: openDrawer === 'CART',
    isMenuOpen: openDrawer === 'MENU',
  })),
  withHandlers({
    handleContentClick: ({ dispatch, isCartOpen, isMenuOpen }) => () => (isCartOpen || isMenuOpen) && dispatch(toggleDrawer('CART')),
  }),
)(Header)
