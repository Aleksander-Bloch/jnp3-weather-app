import styled from "styled-components";

export const FilterPanelWrapper = styled.div`
    grid-area: filter;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    margin: 1rem;
    border-radius: 10px;

    font-weight: ${({ theme }) => theme.fonts.filterPanel.fontWeight};
    background-color: ${({ theme }) => theme.colors.filterPanel.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
`