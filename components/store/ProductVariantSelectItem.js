import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../Button'

const ProductVariantSelectItem = function(props) {
  const {
    name,
    values,
    selectedValue,
    disabled,
    disabledText,
    onSelect,
    variants,
  } = props

  return (
    <fieldset className="product-variant">
      <div>
        <Label disabled={disabled}>{name}</Label>
      </div>
      {disabled && <small>{disabledText}</small>}

      <div className="field">
        {!disabled &&
          values.map(value => (
            <Button
              key={value}
              outline
              secondary={value === selectedValue}
              onClick={() => onSelect({ [name]: value })}
              disabled={
                !variants.find(({ node }) => node.title.includes(value))?.node
                  ?.availableForSale
              }
            >
              {value.replace(/\s*\[.*?\]\s*/g, '')}
            </Button>
          ))}
      </div>
    </fieldset>
  )
}

const Label = styled.label`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  margin-bottom: 0.5rem;
  display: block;
`

ProductVariantSelectItem.defaultProps = {
  disabledText: '',
  selectedValue: '',
}

ProductVariantSelectItem.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedValue: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  disabledText: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  variants: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default ProductVariantSelectItem
