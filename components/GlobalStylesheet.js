import { createGlobalStyle } from 'styled-components'

const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    color: #000;
    background-color: #fff;
    font-family: Barlow, sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Barlow, sans-serif;
    margin-top: 0;
    margin-bottom: 0.5rem;
    text-transform: none;
  }
  h1,
  h2,
  h3 {
    font-weight: 700;
    color: #000;
    line-height: 1.25em;
  }
  h4,
  h5,
  h6 {
    font-weight: 500;
    color: #000;
    text-transform: none;
    font-style: normal;
    line-height: 1.5em;
    padding-bottom: 1rem;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.2rem;
  }
  h4 {
    font-size: 1rem;
  }
  h5 {
    font-size: 1rem;
  }
  section h1,
  nav h1 {
    font-size: 2rem;
  }
  hr {
    margin: 1.3rem 0;
    border: 1px solid #e2e2e2;
  }
  div {
    box-sizing: border-box;
  }
  small {
    font-size: 0.8em;
    color: darkGray;
  }
  a,
  a:visited {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  p {
    line-height: 1.5em;
    font-family: Barlow, sans-serif;
    margin-top: 0;
    margin-bottom: 0.8em;
  }
  img {
    vertical-align: middle;
    width: 100%;
  }
  ul {
    padding-left: 1.5em;
  }
  li {
    line-height: 1.5em;
    color: #000;
    margin: 0.2em;
    font-family: Barlow, sans-serif;
  }
  table {
    width: 100%;
    border-spacing: 0 0.372em;
  }
  table tr td:last-child {
    text-align: right;
  }

  // FORMS
  fieldset {
    margin-bottom: 1em;
    padding: 0;
    border: none;
  }
  legend {
    margin-bottom: 0.61em;
  }
  label {
    font-weight: 600;
    color: #000;
  }
  input:not([type='checkbox']):not([type='radio']) {
    width: 100%;
    border: 0;
    padding: 10px;
    margin-bottom: 0.61em;
    margin-top: 0.61em;
    border-radius: 0.5em;
    display: block;
    font-size: 1rem;
    font-family: Barlow, sans-serif;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05),
      0 2px 3px rgba(0, 0, 0, 0.05);
  }
  input[type='radio'] {
    margin: 0.61em;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #21C2E0;
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
  }
`

export default GlobalStylesheet
