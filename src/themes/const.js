import { lightTheme } from "./light-theme/index.js";
import { darkTheme } from "./dark-theme/index.js";

export const LIGHT_THEME = 'light'
export const DARK_THEME = 'dark'

export const THEME_MAP = {
  [LIGHT_THEME]: lightTheme,
  [DARK_THEME]: darkTheme,
}