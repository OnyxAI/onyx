import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Ropa Sans', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Ropa Sans', sans-serif;
  }

  #app {
    min-height:100vh;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Ropa Sans', sans-serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
