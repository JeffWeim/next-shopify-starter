import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PaddedView = function(props) {
  const { children } = props

  return <PaddedViewWrapper>{children}</PaddedViewWrapper>
}

const PaddedViewWrapper = styled.div`
  padding: 0.5rem 20px 1rem;
  max-height: 100%;

  @media only screen and (min-width: 400px) {
    padding: 0.5rem 20px 1rem;
  }

  @media only screen and (min-width: 1280px) {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 3rem;
  }
`

PaddedView.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PaddedView
