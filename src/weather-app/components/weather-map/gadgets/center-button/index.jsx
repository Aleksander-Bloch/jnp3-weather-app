import { useSelector } from "react-redux";
import { usersGeolocationSelector } from "../../../../geolocation/selectors.js";
import { useMap } from "react-leaflet";
import { FaHome } from "react-icons/fa";
import { CenterButtonWrapper } from "./CenterButtonWrapper.jsx";

export const CenterButton = () => {
  const { latitude, longitude } = useSelector(usersGeolocationSelector)
  const map = useMap()

  return (
    <CenterButtonWrapper onClick={() => map.flyTo([latitude, longitude], map.getZoom())}>
      <FaHome/>
    </CenterButtonWrapper>
  )
}