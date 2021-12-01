import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const HideOnMobile = function ({ children }) {
  return <HideMobileBase>{children}</HideMobileBase>
}

const HideMobileBase = styled.div`
  @media only screen and (max-width: 767px) {
    display: none;
  }
`

HideOnMobile.propTypes = {
  children: PropTypes.node.isRequired,
}

export const HideOnDesktop = function ({ children }) {
  return <HideOnDesktopBase>{children}</HideOnDesktopBase>
}

const HideOnDesktopBase = styled.div`
  @media only screen and (min-width: 768px) {
    display: none;
  }
`

HideOnDesktop.propTypes = {
  children: PropTypes.node.isRequired,
}

export default {
  HideOnMobile,
  HideOnDesktop,
}
