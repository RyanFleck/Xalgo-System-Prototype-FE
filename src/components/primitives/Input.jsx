import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { css } from '@styled-system/css';

/**
 * Input field. Default is text input.
 * @param {String} value is the current text value of the input.
 * @param {Function} onChange will be fired when the value is updated by the user.
 */
const Input = styled.input(
  css({
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    margin: 0,
    padding: '12px',
    border: 'thin',
    borderColor: 'oline',
    borderRadius: 'base',
    fontFamily: 'body',
    fontSize: 'md',
    color: 'textb',
    backgroundColor: 'bg',
    // Remove red outline on required input in Firefox
    boxShadow: 'none',

    // TODO: Any way to make the placeholder text a bit lighter?
    '&::placeholder': {
      color: 'secondary',
    },

    '&:focus': {
      outline: 0,
      borderColor: 'primary',
    },

    '&:disabled': {
      opacity: 0.6,
      filter: 'saturate(60%)',
    },
  }),
  variant({
    variants: {
      search: {
        WebkitAppearance: 'none',
        width: '100%',
        border: 'none',
        height: 3,
        padding: 1,
        background: 'primary',
        color: 'textb',
        '&::placeholder': {
          color: 'textb',
        },

        '&:focus': {
          outline: 0,
          borderColor: 'primary',
        },

        '&:disabled': {
          opacity: 0.6,
          filter: 'saturate(60%)',
        },
      },
      secondary: {
        WebkitAppearance: 'none',
        width: '100%',
        height: 12,
        borderRadius: 8,
        padding: 0,
        background: '#fff',
        border: 'thin',
        borderColor: 'oline',
        '&::-webkit-slider-thumb': {
          WebkitAppearance: 'none',
          width: 4,
          height: 12,
          borderRadius: 8,
          backgroundColor: 'textb',
          cursor: 'pointer',
        },
        '&::-moz-range-thumb': {
          WebkitAppearance: 'none',
          appearance: 'none',
          border: 'none',
          width: 4,
          height: 12,
          backgroundColor: 'textb',
          cursor: 'pointer',
        },
      },
      error: {
        borderColor: 'error',
      },
    },
  })
);

Input.propTypes = {
  /** Button label */
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
};

Input.defaultProps = {
  variant: 'primary',
};

/** @component */
export default Input;
