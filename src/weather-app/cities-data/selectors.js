import { CITIES_DATA_REDUCER_NAME } from "./reducer.js";
import { createSelector } from "@reduxjs/toolkit";
import { PRESSURE_DIST_RANGES, TEMP_DIST_RANGES, WEATHER_NICE, WEATHER_NOT_NICE, WEATHER_PASSABLE } from "./const.js";
import { getRangeLabel, getWeatherNiceness } from "./utils.js";

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
        console.log(nicenessDistribution[key], cumulativeCount)
        nicenessDistribution[key].percent = nicenessDistribution[key].count * 100 / cumulativeCount
      })
    }

    return nicenessDistribution
  }
)

export const temperatureDistributionSelector = createSelector(
  filteredCitiesDataSelector,
  (citiesData) => {
    if (citiesData.length === 0) {
      return null
    }

    const initialDist = TEMP_DIST_RANGES.reduce((dist, tempDistRange) => {
      dist[tempDistRange.label] = 0
      return dist
    }, {})


    return citiesData.reduce((dist, cityData) => {
      const tempRangeLabel = getRangeLabel(cityData.weather.temp_c, TEMP_DIST_RANGES)
      dist[tempRangeLabel]++
      return dist
    }, initialDist)
  }
)

export const pressureDistributionSelector = createSelector(
  filteredCitiesDataSelector,
  (citiesData) => {
    if (citiesData.length === 0) {
      return null
    }

    const initialDist = PRESSURE_DIST_RANGES.reduce((dist, pressureDistRange) => {
      dist[pressureDistRange.label] = 0
      return dist
    }, {})

    return citiesData.reduce((dist, cityData) => {
      const pressureRangeLabel = getRangeLabel(cityData.weather.pressure_mb, PRESSURE_DIST_RANGES)
      dist[pressureRangeLabel]++
      return dist
    }, initialDist)
  }
)