import styled from "styled-components";

export const CenterButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 400;

    border-radius: 50%;
    cursor: pointer;
    padding-bottom: 5px;

    width: ${({ theme }) => theme.dims.centerButton.width};
    height: ${({ theme }) => theme.dims.centerButton.height};

    font-size: ${({theme}) => theme.fonts.centerButton.fontSize};

    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px dashed ${({ theme }) => theme.colors.border};
`