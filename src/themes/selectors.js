import { THEME_REDUCER_NAME } from "./reducer.js";
import { createSelector } from "@reduxjs/toolkit";

export const selectThemeState = (state) => state[THEME_REDUCER_NAME]

export const currentThemeSelector = createSelector(
  selectThemeState,
  ({ currentTheme }) => currentTheme
)