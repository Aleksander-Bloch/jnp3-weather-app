import './App.css'
import { WeatherApp } from "./weather-app/index.jsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./global-styles.js";
import { useSelector } from "react-redux";
import { currentThemeSelector } from "./themes/selectors.js";
import { THEME_MAP } from "./themes/const.js";

export const App = () => {
  const currentTheme = useSelector(currentThemeSelector)

  return (
    <ThemeProvider theme={THEME_MAP[currentTheme]}>
      <GlobalStyle/>
      <WeatherApp/>
    </ThemeProvider>
  )
}
