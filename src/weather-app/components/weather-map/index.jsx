import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { ChangeView } from "./gadgets/ChangeView.jsx";
import { citiesDataSelector, isDataLoadingSelector } from "../../cities-data/selectors.js";
import { CenterButton } from "./gadgets/CenterButton.jsx";
import { Spinner } from "./gadgets/Spinner.jsx";
import { EmojiMarker } from "./markers/EmojiMarker.jsx";
import { WeatherIconMarker } from "./markers/WeatherIconMarker.jsx";


export const WeatherMap = () => {
  const citiesData = useSelector(citiesDataSelector)
  const isDataLoading = useSelector(isDataLoadingSelector)

  const locateUserOnMapLoad = ({ target: map }) => {
    map.locate()
  }

  return (
    <MapContainer id="map" center={[0, 0]} zoom={6} scrollWheelZoom={false} whenReady={locateUserOnMapLoad}>
      <Spinner isVisible={isDataLoading}/>
      <ChangeView/>
      <CenterButton/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {citiesData.map(cityData => (
          <div key={cityData.id}>
            <EmojiMarker cityData={cityData}/>
            <WeatherIconMarker cityData={cityData}/>
          </div>
        )
      )}
    </MapContainer>
  )
}
