import L from "leaflet";
import { getWeatherNiceness } from "../../../cities-data/utils.js";
import { WEATHER_ATTRIBUTES } from "../../../cities-data/const.js";
import { CustomMarker } from "./CustomMarker.jsx";

export const EmojiMarker = ({ cityData }) => {
  const weather = cityData.weather
  const weatherNiceness = getWeatherNiceness(weather.precip_mm, weather.temp_c)
  const weatherAttributes = WEATHER_ATTRIBUTES[weatherNiceness]
  const emojiIcon = new L.divIcon({ html: weatherAttributes.emoji, className: "not-used" })
  return (
    <CustomMarker cityData={cityData} icon={emojiIcon}/>
  )
}