import { CITIES_DATA_REDUCER_NAME } from "./reducer.js";
import { createSelector } from "@reduxjs/toolkit";
import { WEATHER_NICE, WEATHER_NOT_NICE, WEATHER_PASSABLE } from "./const.js";
import { getWeatherNiceness } from "./utils.js";

export const selectCitiesDataState = (state) => state[CITIES_DATA_REDUCER_NAME]

export const citiesDataSelector = createSelector(
  selectCitiesDataState,
  ({ citiesData }) => citiesData
)

export const isDataLoadingSelector = createSelector(
  selectCitiesDataState,
  ({ isDataLoading }) => isDataLoading
)

export const filtersSelector = createSelector(
  selectCitiesDataState,
  ({ filters }) => filters
)

export const filteredCitiesDataSelector = createSelector(
  citiesDataSelector,
  filtersSelector,
  (citiesData, filters) => (
    citiesData.filter((cityData) => {
      const cityName = cityData.name.toLowerCase()
      const cityNameFilter = filters.cityName.trim().toLowerCase()
      return cityName.includes(cityNameFilter) && cityData.population >= filters.minPopulation
    })
  )
)

export const nicenessDistributionSelector = createSelector(
  filteredCitiesDataSelector,
  (citiesData) => {
    if (citiesData.length === 0) {
      return null
    }

    const initialDist = {
      [WEATHER_NICE]: { count: 0, percent: 0.0 },
      [WEATHER_PASSABLE]: { count: 0, percent: 0.0 },
      [WEATHER_NOT_NICE]: { count: 0, percent: 0.0 },
    }
    const nicenessDistribution = citiesData.reduce((dist, cityData) => {
      const niceness = getWeatherNiceness(cityData.weather.precip_mm, cityData.weather.temp_c)
      dist[niceness].count++
      return dist
    }, initialDist)

    const cumulativeCount = citiesData.length
    if (cumulativeCount !== 0) {
      Object.keys(nicenessDistribution).forEach((key) => {
        nicenessDistribution[key].percent = nicenessDistribution[key].count * 100 / cumulativeCount
      })
    }

    return nicenessDistribution
  }
)

export const temperatureDistributionSelector = createSelector(
  filteredCitiesDataSelector,
  (citiesData) => (
    citiesData.map((cityData) => ({ name: cityData.name, value: cityData.weather.temp_c }))
      .sort((c1, c2) => c1.value - c2.value)
  )
)

export const pressureDistributionSelector = createSelector(
  filteredCitiesDataSelector,
  (citiesData) => (
    citiesData.map((cityData) => ({ name: cityData.name, value: cityData.weather.pressure_mb }))
      .sort((c1, c2) => c1.value - c2.value)
  )
)