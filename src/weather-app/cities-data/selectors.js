import { CITIES_DATA_REDUCER_NAME } from "./reducer.js";
import { createSelector } from "@reduxjs/toolkit";

export const selectCitiesDataState = (state) => state[CITIES_DATA_REDUCER_NAME]

export const citiesDataSelector = createSelector(
  selectCitiesDataState,
  ({ citiesData }) => citiesData
)