import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Grid = function(props) {
  const { children, template, gap } = props

  return (
    <GridBase gap={gap} template={template}>
      {children}
    </GridBase>
  )
}

const GridBase = styled.div`
  display: grid;
  grid-column-gap: ${({ gap }) => `${gap}rem`};
  grid-row-gap: ${({ gap }) => `${gap}rem`};
  grid-template-columns: ${({ template }) => template};
`

Grid.defaultProps = {
  children: null,
  gap: '2',
}

Grid.propTypes = {
  children: PropTypes.node,
  template: PropTypes.string.isRequired,
  gap: PropTypes.string,
}

export default Grid
