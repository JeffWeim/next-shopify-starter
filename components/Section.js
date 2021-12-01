import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Section = function({ children, ...props }) {
  return <SectionBase {...props}>{children}</SectionBase>
}

const SectionBase = styled.section`
  padding-top: 2rem;
`

Section.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Section
