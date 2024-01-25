import { useDispatch } from "react-redux";
import { centerMapRequest } from "../../geolocation/reducer.js";

export const CenterButton = () => {
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(centerMapRequest())}>
      Center Map On Your Location
    </button>
  )
}