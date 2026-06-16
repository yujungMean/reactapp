// 전역 스타일 — 폰트 선언, CSS 리셋, body 기본값
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scrollbar-gutter: stable;
  }

  /* Fonts moved to index.css to prevent styled-components flickering bug */

  body {
    font-family: 'pretendard', sans-serif;
    font-weight: 400;
    color: ${({ theme }) => theme.TEXT_COLOR.basic};
    letter-spacing: -0.02em;
    line-height: 1.3;
    text-decoration: none;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.05);
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: 'pretendard', sans-serif;
  }

  a {
    /* text-decoration: none;
    color: inherit; */
  }
`;

export default GlobalStyle;
