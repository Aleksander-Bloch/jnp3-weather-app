import { useMapEvents } from "react-leaflet";
import { useDispatch } from "react-redux";
import { changeMapViewRequest } from "../../cities-data/reducer.js";
import { updateUsersGeolocation } from "../../geolocation/reducer.js";

export function ChangeView() {
  const dispatch = useDispatch()
  const map = useMapEvents({
    locationfound: (e) => {
      map.flyTo(e.latlng, map.getZoom())
      const locationPayload = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      }
      dispatch(updateUsersGeolocation(locationPayload))
    },
    moveend: () => {
      const bounds = map.getBounds()
      const boundsPayload = {
        south: bounds.getSouth(),
        west: bounds.getWest(),
        north: bounds.getNorth(),
        east: bounds.getEast(),
      }
      dispatch(changeMapViewRequest(boundsPayload))
    }
  })
  return null
}