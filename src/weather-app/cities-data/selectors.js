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

export const cityNameFilterSelector = createSelector(
  filtersSelector,
  ({ cityName }) => cityName
)

export const minPopulationFilterSelector = createSelector(
  filtersSelector,
  ({ minPopulation }) => minPopulation
)

export const filteredCitiesDataSelector = createSelector(
  citiesDataSelector,
  cityNameFilterSelector,
  minPopulationFilterSelector,
  (citiesData, cityNameFilter, minPopulationFilter) => citiesData.filter((cityData) => cityData.name.toLowerCase().includes(cityNameFilter.toLowerCase()) && cityData.population >= minPopulationFilter)
)

export const nicenessDistributionSelector = createSelector(
  citiesDataSelector,
  (citiesData) => {
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
        console.log(nicenessDistribution[key], cumulativeCount)
        nicenessDistribution[key].percent = nicenessDistribution[key].count * 100 / cumulativeCount
      })
    }

    return nicenessDistribution
  }
)