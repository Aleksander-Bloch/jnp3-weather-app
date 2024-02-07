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

        background-color: ${({ theme }) => theme.colors.background};
    }
`
