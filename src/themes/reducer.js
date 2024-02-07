import { createSlice } from "@reduxjs/toolkit";
import { LIGHT_THEME } from "./const.js";

export const THEME_REDUCER_NAME = 'theme'

const initialState = {
  currentTheme: LIGHT_THEME
}

export const themeSlice = createSlice({
  name: THEME_REDUCER_NAME,
  initialState,
  reducers: {
    updateTheme: (state, { payload: theme }) => {
      state.currentTheme = theme
    }
  }
})

export const { updateTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer