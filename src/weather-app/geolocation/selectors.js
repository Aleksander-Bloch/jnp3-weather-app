import { GEOLOCATION_REDUCER_NAME } from "./reducer.js";
import { createSelector } from "@reduxjs/toolkit";

export const selectGeolocationState = (state) => state[GEOLOCATION_REDUCER_NAME]

export const usersGeolocationSelector = createSelector(
  selectGeolocationState,
  ({ usersGeolocation }) => usersGeolocation
)