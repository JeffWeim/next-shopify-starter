import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

const Button = function(props) {
  const {
    bgColor,
    children,
    color,
    disabled,
    loading,
    onClick,
    textColor,
  } = props

  return (
    <ButtonBase
      bgColor={bgColor}
      color={color}
      disabled={disabled}
      onClick={!loading ? onClick : undefined}
      textColor={textColor}
    >
      {children}
    </ButtonBase>
  )
}

const ButtonBase = styled.button`
  -webkit-tap-highlight-color: transparent;
  box-shadow: ${({ disabled }) =>
    disabled ? '' : '0px 3px 3px -2px rgba(0,0,0,0.15)'};
  background: ${({ bgColor }) => bgColor};
  border-radius: 0.5em;
  border: 2px solid ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  cursor: pointer;
  font-size: 0.8em;
  font-weight: 600;
  margin: 0 0.5em 0.5em 0;
  outline: none;
  padding: 0.8em 1.2em;
  transition: 0.2s transform, 0.2s box-shadow, 0.3s background linear,
    0.3s border linear;

  @media only screen and (min-width: 768px) {
    font-size: 0.9em;
  }

  &:active {
    box-shadow: none;
    color: ${({ bgColor }) => bgColor};
    transform: translateY(2px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`

Button.defaultProps = {
  color: '#EFEFEF',
  textColor: '#2D2D2D',
  bgColor: '#EFEFEF',
  disabled: false,
  loading: false,
}

Button.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  textColor: PropTypes.string,
}

export default compose(
  withTheme,
  withProps(
    ({ primary, theme }) =>
      primary && {
        color: theme.colors.blue,
        bgColor: theme.colors.blue,
        textColor: theme.colors.white,
      },
  ),
  withProps(
    ({ secondary, theme }) =>
      secondary && {
        color: theme.colors.blue,
        bgColor: theme.colors.blue,
        textColor: theme.colors.white,
      },
  ),
  withProps(
    ({ outline, color, theme }) =>
      outline && {
        bgColor: 'transparent',
        textColor:
          color === theme.colors.offWhite ? theme.colors.offBlack : color,
      },
  ),
  withProps(
    ({ disabled, theme }) =>
      disabled && {
        bgColor: theme.colors.lightGray,
        textColor: theme.colors.midGray,
        color: theme.colors.lightGray,
      },
  ),
)(Button)
