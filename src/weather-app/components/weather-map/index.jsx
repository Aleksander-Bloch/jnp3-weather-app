import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { usersGeolocationSelector } from "../../geolocation/selectors.js";
import { ChangeView } from "./ChangeView.jsx";

export const WeatherMap = () => {
  const { latitude, longitude } = useSelector(usersGeolocationSelector)

  return (
    <MapContainer id="map" center={[latitude, longitude]} zoom={6} scrollWheelZoom={false}>
      <ChangeView center={[latitude, longitude]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          A pretty CSS3 popup. <br/> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
