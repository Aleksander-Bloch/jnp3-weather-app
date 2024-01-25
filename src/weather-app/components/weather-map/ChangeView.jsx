import { useMap } from "react-leaflet";

export function ChangeView({ center }) {
  const map = useMap()
  map.setView(center)
  console.log(map.getBounds())
  return null
}