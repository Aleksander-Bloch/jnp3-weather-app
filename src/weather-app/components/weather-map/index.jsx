import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { usersGeolocationSelector } from "../../geolocation/selectors.js";
import { ChangeView } from "./ChangeView.jsx";
import { citiesDataSelector } from "../../cities-data/selectors.js";
import { WEATHER_ATTRIBUTES } from "../../cities-data/const.js";
import { getWeatherNiceness } from "../../cities-data/utils.js";

export const WeatherMap = () => {
  const { latitude, longitude } = useSelector(usersGeolocationSelector)
  const citiesData = useSelector(citiesDataSelector)

  return (
    <MapContainer id="map" center={[latitude, longitude]} zoom={6} scrollWheelZoom={false}>
      <ChangeView center={[latitude, longitude]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        citiesData.map(cityData => {
          const weather = cityData.weather
          const weatherNiceness = getWeatherNiceness(weather.precip_mm, weather.temp_c)
          const weatherAttributes = WEATHER_ATTRIBUTES[weatherNiceness]
          return (
            <Marker key={cityData.id} position={[cityData.lat, cityData.lon]}>
              <Popup>
                <b>{cityData.name}</b>
                <p>Precipitation: {weather.precip_mm}</p>
                <p>Temperature: {weather.temp_c}&deg;C</p>
                <p>Niceness: {weatherAttributes.text} {weatherAttributes.emoji}</p>
                A pretty CSS3 popup. <br/> Easily customizable.
              </Popup>
            </Marker>
          )
        })
      }
    </MapContainer>
  )
}
