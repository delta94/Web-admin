import { createGlobalStyle } from 'styled-components';
// import { StyleConstants } from './StyleConstants';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  p,
  label {
    line-height: 1.5em;
    font-size: 14px !important;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
