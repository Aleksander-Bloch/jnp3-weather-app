import { createAction, createSlice } from "@reduxjs/toolkit";

export const WEATHER_DATA_REDUCER_NAME = 'weatherData'

const initialState = {
  weatherByTheCity: []
}

export const weatherDataSlice = createSlice({
  name: WEATHER_DATA_REDUCER_NAME,
  initialState,
  reducers: {
    updateWeatherByTheCity: (state, { payload }) => {
      state.weatherByTheCity = payload
    }
  }
})

export const changeMapViewRequest = createAction(`${WEATHER_DATA_REDUCER_NAME}/changeMapViewRequest`)

export const { updateWeatherByTheCity } = weatherDataSlice.actions

export const weatherDataReducer = weatherDataSlice.reducer