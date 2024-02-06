import axios from "axios";
import {
  MAX_CITIES,
  NICE_TEMP_RANGE,
  OVERPASS_API_URL, TEMP_DIST_RANGES,
  WEATHER_API_KEY,
  WEATHER_API_URL,
  WEATHER_NICE,
  WEATHER_NOT_NICE,
  WEATHER_PASSABLE
} from "./const.js";
import { defaultIfEmpty, forkJoin, from, map } from "rxjs";
import { isDefined } from "../../utils.js";

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

export const getWeatherNiceness = (precip_mm, temp_c) => {
  if (isWeatherNice(precip_mm, temp_c)) {
    return WEATHER_NICE
  } else if (isWeatherPassable(precip_mm, temp_c)) {
    return WEATHER_PASSABLE
  } else {
    return WEATHER_NOT_NICE
  }
}

export const getRangeLabel = (value, distRanges) => (
  distRanges.reduce((label, distRange) => (
    value >= distRange.range[0] && value <= distRange.range[1] ? distRange.label : label
  ), '')
)

export const createDistRanges = (min, max, numRanges) => {
  if (min >= max) {
    throw new Error(`min: ${min} >= max: ${max}`)
  }
  if (numRanges < 2) {
    throw new Error(`Number of ranges has to be at least 2 (got ${numRanges})`)
  }
  const step = (max - min) / numRanges
  const distRanges = []
  let currentStart = min
  distRanges.push({ range: [Number.NEGATIVE_INFINITY, min - Number.MIN_VALUE], label: `< ${min}` })
  for (let i = 0; i < numRanges; i++) {
    distRanges.push({
      range: [currentStart, currentStart + step - Number.MIN_VALUE],
      label: `[${currentStart.toFixed(1)}, ${(currentStart + step).toFixed(1)})`
    })
    currentStart += step
  }
  distRanges.push({ range: [max, Number.POSITIVE_INFINITY], label: `≥ ${max}` })

  return distRanges
}

export const createDataForCitiesWithinBounds = (bounds) => (
  from(requestDataForCitiesWithinBounds(bounds)).pipe(
    map((response) => response.data.elements
      .filter((city) => isDefined(city.tags.population))
      .sort(compareCitiesByPopulationDesc)
      .slice(0, MAX_CITIES)
      .map((city) => ({
        id: city.id,
        lat: city.lat,
        lon: city.lon,
        name: city.tags.name,
        population: Number(city.tags.population)
      }))
    ),
  )
)

export const updateCitiesDataWithWeatherDataWithCaching = (fetchedCities, knownCities) => (
  forkJoin(
    fetchedCities
      .filter((fetchedCity) => !knownCities.some((knownCity) => knownCity.id === fetchedCity.id))
      .map((newCity) => updateCityDataWithWeatherData(newCity))
  ).pipe(
    defaultIfEmpty([]),
    map((updatedNewCitiesData) => updatedNewCitiesData.concat(
      knownCities.filter((knownCity) => fetchedCities.some((fetchedCity) => fetchedCity.id === knownCity.id))
    ))
  )
)

export const updateCitiesDataWithWeatherData = (cities) => (
  forkJoin(
    cities.map((newCity) => updateCityDataWithWeatherData(newCity))
  ).pipe(
    defaultIfEmpty([])
  )
)

const updateCityDataWithWeatherData = (city) => (
  from(requestWeatherDataForGeolocation(city.lat, city.lon)).pipe(
    map((response) => response.data.current),
    map((currentWeather) => ({
      ...city,
      weather: {
        precip_mm: currentWeather.precip_mm,
        temp_c: currentWeather.temp_c,
        pressure_mb: currentWeather.pressure_mb,
        icon: currentWeather.condition.icon,
      }
    }))
  )
)

const requestWeatherDataForGeolocation = (lat, lon) => (
  axios.get(`${WEATHER_API_URL}?q=${lat},${lon}&key=${WEATHER_API_KEY}`)
)

const isWeatherNice = (precip_mm, temp_c) => (
  precip_mm === 0 && temp_c >= NICE_TEMP_RANGE.min && temp_c <= NICE_TEMP_RANGE.max
)

const isWeatherPassable = (precip_mm, temp_c) => (
  precip_mm === 0 || (temp_c >= NICE_TEMP_RANGE.min && temp_c <= NICE_TEMP_RANGE.max)
)