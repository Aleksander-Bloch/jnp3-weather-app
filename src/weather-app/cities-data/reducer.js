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
    updateFilters: (state, { payload: filters }) => {
      state.filters = filters
    },
  }
})

export const changeMapViewRequest = createAction(`${CITIES_DATA_REDUCER_NAME}/changeMapViewRequest`)

export const {
  updateCitiesData,
  setLoadingState,
  updateFilters
} = citiesDataSlice.actions

export const citiesDataReducer = citiesDataSlice.reducer