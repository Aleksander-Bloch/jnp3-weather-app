import { createAction, createSlice } from "@reduxjs/toolkit";
import { getWeatherNiceness } from "./utils.js";

export const CITIES_DATA_REDUCER_NAME = 'citiesData'

const initialState = {
  citiesData: []
}

export const citiesDataSlice = createSlice({
  name: CITIES_DATA_REDUCER_NAME,
  initialState,
  reducers: {
    updateCitiesData: (state, { payload }) => {
      state.citiesData = payload
    }
  }
})

export const changeMapViewRequest = createAction(`${CITIES_DATA_REDUCER_NAME}/changeMapViewRequest`)

export const { updateCitiesData } = citiesDataSlice.actions

export const citiesDataReducer = citiesDataSlice.reducer