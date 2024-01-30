import { Marker, Popup } from "react-leaflet";
import { getWeatherNiceness } from "../../../cities-data/utils.js";
import { WEATHER_ATTRIBUTES } from "../../../cities-data/const.js";

export const CustomMarker = ({ cityData, icon }) => {
  const weather = cityData.weather
  const weatherNiceness = getWeatherNiceness(weather.precip_mm, weather.temp_c)
  const weatherAttributes = WEATHER_ATTRIBUTES[weatherNiceness]
  return (
    <Marker position={[cityData.lat, cityData.lon]} icon={icon}>
      <Popup>
        <b>{cityData.name}</b><br/>
        Precipitation: {weather.precip_mm}<br/>
        Temperature: {weather.temp_c}&deg;C<br/>
        Niceness: {weatherAttributes.text}<br/>
      </Popup>
    </Marker>
  )
}