import { createAction, createSlice } from "@reduxjs/toolkit";

export const CITIES_DATA_REDUCER_NAME = 'citiesData'

const initialState = {
  isDataLoading: false,
  citiesData: []
}

export const citiesDataSlice = createSlice({
  name: CITIES_DATA_REDUCER_NAME,
  initialState,
  reducers: {
    updateCitiesData: (state, { payload }) => {
      state.citiesData = payload
      state.isDataLoading = false
    },
    setLoadingState: (state) => {
      state.isDataLoading = true
    }
  }
})

export const changeMapViewRequest = createAction(`${CITIES_DATA_REDUCER_NAME}/changeMapViewRequest`)

export const { updateCitiesData, setLoadingState } = citiesDataSlice.actions

export const citiesDataReducer = citiesDataSlice.reducer