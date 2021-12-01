import React from 'react'
import styled from 'styled-components'

import Image from '../Image'

const ProductImage = function(props) {
  return (
    <ProductImageBase>
      <Content>
        <Image {...props} />
      </Content>
    </ProductImageBase>
  )
}

const Content = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: ${({ theme }) => theme.colors.offWhite};
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 0;

  img {
    max-height: 100%;
    object-fit: contain;
  }
`

const ProductImageBase = styled.div`
  position: relative;
  padding-top: 100%;
`

export default ProductImage
