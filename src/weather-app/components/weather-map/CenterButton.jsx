import { useSelector } from "react-redux";
import { usersGeolocationSelector } from "../../geolocation/selectors.js";
import { useMap } from "react-leaflet";

export const CenterButton = () => {
  const { latitude, longitude } = useSelector(usersGeolocationSelector)
  const map = useMap()

  return (
    <button onClick={() => map.flyTo([latitude, longitude], map.getZoom())}
            style={{ position: "absolute", bottom: "10px", left: "10px", zIndex: 400 }}>
      Center Map On Your Location
    </button>
  )
}