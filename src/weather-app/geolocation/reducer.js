import { createSlice } from '@reduxjs/toolkit'

export const GEOLOCATION_REDUCER_NAME = 'geolocation'

const initialState = {
  usersGeolocation: {
    latitude: 0,
    longitude: 0,
  }
}

export const geolocationSlice = createSlice({
  name: GEOLOCATION_REDUCER_NAME,
  initialState,
  reducers: {
    updateUsersGeolocation: (state, { payload }) => {
      state.usersGeolocation = payload
    },
  },
})

export const { updateUsersGeolocation } = geolocationSlice.actions

export const geolocationReducer = geolocationSlice.reducer