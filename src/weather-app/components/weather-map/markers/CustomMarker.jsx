import { Marker, Popup } from "react-leaflet";
import { getWeatherNiceness } from "../../../cities-data/utils.js";
import { PRESSURE_UNIT, TEMPERATURE_UNIT, WEATHER_ATTRIBUTES } from "../../../cities-data/const.js";

export const CustomMarker = ({ cityData, icon }) => {
  const weather = cityData.weather
  const weatherNiceness = getWeatherNiceness(weather.precip_mm, weather.temp_c)
  const weatherAttributes = WEATHER_ATTRIBUTES[weatherNiceness]
  return (
    <Marker position={[cityData.lat, cityData.lon]} icon={icon}>
      <Popup>
        <b>{cityData.name}</b><br/>
        Population: {cityData.population}<br/>
        Precipitation: {weather.precip_mm}<br/>
        Temperature: {weather.temp_c}{TEMPERATURE_UNIT}<br/>
        Pressure: {weather.pressure_mb}{PRESSURE_UNIT}<br/>
        Niceness: {weatherAttributes.text}<br/>
      </Popup>
    </Marker>
  )
}