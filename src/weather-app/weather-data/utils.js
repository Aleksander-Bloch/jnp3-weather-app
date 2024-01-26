import axios from "axios";
import { OVERPASS_API_URL } from "./const.js";

export const requestDataForCitiesWithinBounds = ({south, west, north, east}) => {
  const query = `
    [out:json];
    node
      [place="city"]
      (${south},${west},${north},${east});
    out;`
  return axios.post(OVERPASS_API_URL, "data=" + encodeURIComponent(query))
}

export const compareCitiesByPopulationDesc = (c1, c2) => {
  if (c1.tags.population > c2.tags.population) {
    return -1
  } else if (c2.tags.population < c2.tags.population) {
    return 1
  }
  return 0
}