import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { ChangeView } from "./ChangeView.jsx";
import { citiesDataSelector, isDataLoadingSelector } from "../../cities-data/selectors.js";
import { WEATHER_ATTRIBUTES } from "../../cities-data/const.js";
import { getWeatherNiceness } from "../../cities-data/utils.js";
import { CenterButton } from "./CenterButton.jsx";
import { Grid } from "react-loader-spinner";
import L from 'leaflet';


export const WeatherMap = () => {
  const citiesData = useSelector(citiesDataSelector)
  const isDataLoading = useSelector(isDataLoadingSelector)

  return (
    <MapContainer id="map" center={[0, 0]} zoom={6} scrollWheelZoom={false}
                  whenReady={({ target: map }) => {
                    map.locate()
                  }}>
      <Grid
        visible={isDataLoading}
        height="40"
        width="40"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{"zIndex": "400", "position": "absolute", "top": "10px", "right": "10px"}}
        wrapperClass="grid-wrapper"
      />
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
          const emojiIcon = new L.divIcon({ html: weatherAttributes.emoji, className: "not-used" })
          const weatherIcon = new L.Icon({ iconUrl: `https:${weather.icon}`, iconAnchor: [10, 60] })
          return (
            <div key={cityData.id}>
              <Marker position={[cityData.lat, cityData.lon]} icon={emojiIcon}>
                <Popup>
                  <b>{cityData.name}</b><br/>
                  <span>Precipitation: {weather.precip_mm}</span><br/>
                  <span>Temperature: {weather.temp_c}&deg;C</span><br/>
                  <span>Niceness: {weatherAttributes.text}</span><br/>
                </Popup>
              </Marker>
              <Marker position={[cityData.lat, cityData.lon]} icon={weatherIcon}>
                <Popup>
                  <b>{cityData.name}</b><br/>
                  <span>Precipitation: {weather.precip_mm}</span><br/>
                  <span>Temperature: {weather.temp_c}&deg;C</span><br/>
                  <span>Niceness: {weatherAttributes.text}</span><br/>
                </Popup>
              </Marker>
            </div>
          )
        })
      }
    </MapContainer>
  )
}
