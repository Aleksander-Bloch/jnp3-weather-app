import styled from "styled-components";

export const ThemeSwitcherWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    
    border-radius: 50%;
    padding-bottom: 3px;
    cursor: pointer;

    width: ${({ theme }) => theme.dims.themeSwitcher.width};
    height: ${({ theme }) => theme.dims.themeSwitcher.height};

    font-size: ${({ theme }) => theme.fonts.themeSwitcher.fontSize};

    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px dashed ${({ theme }) => theme.colors.border};
`