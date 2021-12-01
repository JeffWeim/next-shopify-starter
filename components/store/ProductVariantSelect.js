import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ProductVariantSelectItem from './ProductVariantSelectItem'

const filterSelectedOptions = (selectedOptions, options) => options.reduce((obj, item) => {
    if (!selectedOptions[item.name]) {
      return obj
    }

    // eslint-disable-next-line
    const option = ((obj[item.name] = selectedOptions[item.name]), obj)

    return option
  }, {})

const getAvailableVariants = (variants, selectedOptions) => {
  const availableEdges = variants.edges.filter(variant => {
    const variantOptions = variant.node.selectedOptions.reduce((obj, item) => {
      // eslint-disable-next-line
      obj[item.name] = item.value

      return obj
    }, {})

    return Object.keys(selectedOptions).every(
      k => variantOptions[k] === selectedOptions[k],
    )
  })

  return { edges: availableEdges }
}

const getAvailableOptionValues = (name, variants) => {
  const dupeValues = variants.edges.map(
    variant =>
      variant.node.selectedOptions.find(option => option.name === name).value,
  )

  return [...new Set(dupeValues)]
}

const ProductVariantSelect = props => {
  const { product, onVariantSelect } = props

  const [selectedOptions, setSelectedOptions] = useState({})

  const handleOptionSelect = change => {
    const optionPos = product.options.findIndex(
      option => option.name === Object.keys(change)[0],
    )
    const slicedOptions = product.options.slice(0, optionPos)
    const nextSelectedOptions = {
      ...filterSelectedOptions(selectedOptions, slicedOptions),
      ...change,
    }
    const availableVariants = getAvailableVariants(
      product.variants,
      nextSelectedOptions,
    )

    onVariantSelect(availableVariants)
    setSelectedOptions(nextSelectedOptions)
  }

  // If you'd like to set a selected option on page load:
  // useEffect(() => {
  //   const name = product?.variants?.edges[0].node.selectedOptions[0].name
  //   const value = product?.variants?.edges[0].node.selectedOptions[0].value

  //   handleOptionSelect({
  //     [name]: value,
  //   })
  // }, [])

  return product?.options.map((option, i) => (
    <ProductVariantSelectItem
      key={option.name}
      name={option.name}
      values={getAvailableOptionValues(
        option.name,
        getAvailableVariants(
          product.variants,
          filterSelectedOptions(selectedOptions, product?.options.slice(0, i)),
        ),
      )}
      selectedValue={selectedOptions[option.name]}
      onSelect={handleOptionSelect}
      variants={product?.variants?.edges}
      disabled={Object.keys(selectedOptions).length < i}
      disabledText={`Please select a ${product?.options[i - 1]?.name}`}
    />
  ))
}

ProductVariantSelect.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  handleOptionSelect: PropTypes.func,
  selectedOptions: PropTypes.objectOf(PropTypes.any),
}

export default ProductVariantSelect
