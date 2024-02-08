import styled from "styled-components";

export const WeatherAppWrapper = styled.main`
    display: grid;
    grid-template-areas:
        "map map map filter"
        "map map map n-chart"
        "t-chart t-chart p-chart p-chart";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 30vh 40vh minmax(500px, auto);
    align-content: center;
    justify-content: center;
    gap: 10px;
    @media (max-width: 1024px) {
        grid-template-areas:
          "map map map filter"
          "map map map n-chart"
          "t-chart t-chart t-chart t-chart"
          "p-chart p-chart p-chart p-chart";
        grid-template-rows: 30vh 30vh repeat(2, minmax(300px, auto));
    }
    @media (max-width: 768px) {
        grid-template-areas:
            "map map"
            "filter n-chart"
            "t-chart t-chart"
            "p-chart p-chart";
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 60vh minmax(200px, auto) repeat(2, minmax(300px, auto));
    }
    @media (max-width: 512px) {
        grid-template-areas:
            "map"
            "filter"
            "n-chart"
            "t-chart"
            "p-chart";
        grid-template-columns: 1fr;
        grid-template-rows: 60vh repeat(2, minmax(200px, auto)) repeat(2, minmax(300px, auto));
    }
`