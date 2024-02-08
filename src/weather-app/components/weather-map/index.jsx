import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { ChangeView } from "./gadgets/ChangeView.jsx";
import { filteredCitiesDataSelector, isDataLoadingSelector } from "../../cities-data/selectors.js";
import { CenterButton } from "./gadgets/center-button/index.jsx";
import { Spinner } from "./gadgets/spinner/index.jsx";
import { EmojiMarker } from "./markers/EmojiMarker.jsx";
import { WeatherIconMarker } from "./markers/WeatherIconMarker.jsx";
import { WeatherMapWrapper } from "./WeatherMapWrapper.jsx";


export const WeatherMap = () => {
  const filteredCitiesData = useSelector(filteredCitiesDataSelector)
  const isDataLoading = useSelector(isDataLoadingSelector)

  const locateUserOnMapLoad = ({ target: map }) => {
    map.locate()
  }

  return (
    <WeatherMapWrapper>
      <MapContainer id="map" center={[0, 0]} zoom={6} scrollWheelZoom={false} whenReady={locateUserOnMapLoad}>
        <Spinner isVisible={isDataLoading}/>
        <ChangeView/>
        <CenterButton/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredCitiesData.map(cityData => (
            <div key={cityData.id}>
              <EmojiMarker cityData={cityData}/>
              <WeatherIconMarker cityData={cityData}/>
            </div>
          )
        )}
      </MapContainer>
    </WeatherMapWrapper>
  )
}
