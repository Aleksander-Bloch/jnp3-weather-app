import { WeatherMap } from "./components/weather-map/index.jsx";
import { FilterPanel } from "./components/filter-panel/index.jsx";
import { NicenessChart } from "./components/charts/niceness-chart/index.jsx";
import { TemperatureChart } from "./components/charts/temperature-chart/index.jsx";
import { PressureChart } from "./components/charts/pressure-chart/index.jsx";
import { WeatherAppWrapper } from "./WeatherAppWrapper.jsx";
import { Footer } from "./components/footer/index.jsx";

export const WeatherApp = () => (
  <>
    <WeatherAppWrapper>
      <WeatherMap/>
      <FilterPanel/>
      <NicenessChart/>
      <TemperatureChart/>
      <PressureChart/>
    </WeatherAppWrapper>
    <Footer/>
  </>
)