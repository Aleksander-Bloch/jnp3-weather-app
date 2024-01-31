import { CITIES_DATA_REDUCER_NAME } from "./reducer.js";
import { createSelector } from "@reduxjs/toolkit";

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