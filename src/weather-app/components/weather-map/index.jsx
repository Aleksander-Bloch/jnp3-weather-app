import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { ChangeView } from "./ChangeView.jsx";
import { citiesDataSelector } from "../../cities-data/selectors.js";
import { WEATHER_ATTRIBUTES } from "../../cities-data/const.js";
import { getWeatherNiceness } from "../../cities-data/utils.js";
import { CenterButton } from "./CenterButton.jsx";

export const WeatherMap = () => {
  const citiesData = useSelector(citiesDataSelector)
  console.log('WeatherMap')

  return (
    <MapContainer id="map" center={[0, 0]} zoom={6} scrollWheelZoom={false}
                  whenReady={({ target: map }) => {
                    map.locate()
                  }}>
      <ChangeView/>
      <CenterButton/>
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
