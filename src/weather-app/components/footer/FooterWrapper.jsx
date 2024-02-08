import styled from "styled-components";

export const FooterWrapper = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;

    border-top: 1px solid ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.fonts.footer.fontSize};
    background-color: ${({ theme }) => theme.colors.footer.background};
`