import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;

        font-family: ${({ theme }) => theme.fonts.basic.fontFamily};
        font-size: ${({ theme }) => theme.fonts.basic.fontSize};
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
    }

    #map {
        height: 100%;
    }

    a {
        color: inherit;
    }
`
