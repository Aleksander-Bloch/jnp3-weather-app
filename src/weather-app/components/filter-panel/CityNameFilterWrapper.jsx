import styled from "styled-components";

export const CityNameFilterWrapper = styled.div`
    margin-bottom: 1rem;

    input {
        margin-top: 0.5rem;
        padding: 0.5rem;
        border-radius: 10px;

        font-weight: ${({ theme }) => theme.fonts.cityNameFilter.fontWeight};
        border: 1px solid ${({ theme }) => theme.colors.border};
        background-color: ${({ theme }) => theme.colors.filterPanel.background};
        color: ${({ theme }) => theme.colors.text};
    }
`