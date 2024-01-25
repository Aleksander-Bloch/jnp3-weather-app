import './App.css'
import { WeatherApp } from "./weather-app/index.jsx";
import axios from "axios";

export const App = () => {
  // FIXME: Get correct map bounds using getBounds from useMap hook
  // I'll need to create a slice to store weather information for 20 largest cities in those bounds
  // In an epic, I'll make a request to the overpass api
  // Then filter it for the largest 20 cities
  // Then get weather info from Weather API
  // Then dispatch an action to store those information in a slice
  axios.post("https://overpass-api.de/api/interpreter", "data=" + encodeURIComponent(`
    [out:json];
    node
      [place="city"]
      (52.06262321411286,18.594360351562504,52.3923633970718,23.4228515625);
    out;`
  )).then(data => console.log(data))

  return <WeatherApp/>
}
