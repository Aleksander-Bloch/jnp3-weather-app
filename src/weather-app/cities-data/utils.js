import axios from "axios";
import {
  NICE_TEMP_RANGE,
  OVERPASS_API_URL,
  WEATHER_API_KEY,
  WEATHER_API_URL,
  WEATHER_NICE,
  WEATHER_NOT_NICE,
  WEATHER_PASSABLE
} from "./const.js";

export const requestDataForCitiesWithinBounds = ({ south, west, north, east }) => {
  const query = `
    [out:json];
    node
      [place="city"]
      (${south},${west},${north},${east});
    out;`
  return axios.post(OVERPASS_API_URL, "data=" + encodeURIComponent(query))
}

export const compareCitiesByPopulationDesc = (c1, c2) => {
  const pop1 = Number(c1.tags.population)
  const pop2 = Number(c2.tags.population)
  if (pop1 > pop2) {
    return -1
  } else if (pop1 < pop2) {
    return 1
  }
  return 0
}

export const requestWeatherDataForGeolocation = (lat, lon) => (
  axios.get(`${WEATHER_API_URL}?q=${lat},${lon}&key=${WEATHER_API_KEY}`)
)

export const getWeatherNiceness = (precip_mm, temp_c) => {
  if (isWeatherNice(precip_mm, temp_c)) {
    return WEATHER_NICE
  } else if (isWeatherPassable(precip_mm, temp_c)) {
    return WEATHER_PASSABLE
  } else {
    return WEATHER_NOT_NICE
  }
}

const isWeatherNice = (precip_mm, temp_c) => (
  precip_mm === 0 && temp_c >= NICE_TEMP_RANGE.min && temp_c <= NICE_TEMP_RANGE.max
)

const isWeatherPassable = (precip_mm, temp_c) => (
  precip_mm === 0 || (temp_c >= NICE_TEMP_RANGE.min && temp_c <= NICE_TEMP_RANGE.max)
)