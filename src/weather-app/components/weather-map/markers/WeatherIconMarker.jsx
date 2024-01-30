import L from "leaflet";
import { CustomMarker } from "./CustomMarker.jsx";

export const WeatherIconMarker = ({ cityData }) => {
  const weather = cityData.weather
  const weatherIcon = new L.Icon({ iconUrl: `https:${weather.icon}`, iconAnchor: [10, 60] })
  return (
    <CustomMarker cityData={cityData} icon={weatherIcon}/>
  )
}