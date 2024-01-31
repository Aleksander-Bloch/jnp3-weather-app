import { createAction, createSlice } from "@reduxjs/toolkit";

export const CITIES_DATA_REDUCER_NAME = 'citiesData'

const initialState = {
  isDataLoading: false,
  citiesData: [],
  filters: {
    cityName: '',
    minPopulation: 0,
  }
}

export const citiesDataSlice = createSlice({
  name: CITIES_DATA_REDUCER_NAME,
  initialState,
  reducers: {
    updateCitiesData: (state, { payload: citiesData }) => {
      state.citiesData = citiesData
      state.isDataLoading = false
    },
    setLoadingState: (state) => {
      state.isDataLoading = true
    },
    updateCityNameFilter: (state, { payload }) => {
      state.filters.cityName = payload.cityName
    },
    updateMinPopulationFilter: (state, { payload }) => {
      state.filters.minPopulation = payload.minPopulation
    },
  }
})

export const changeMapViewRequest = createAction(`${CITIES_DATA_REDUCER_NAME}/changeMapViewRequest`)

export const {
  updateCitiesData,
  setLoadingState,
  updateCityNameFilter,
  updateMinPopulationFilter
} = citiesDataSlice.actions

export const citiesDataReducer = citiesDataSlice.reducer