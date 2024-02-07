import { useDispatch, useSelector } from "react-redux";
import { currentThemeSelector } from "../../selectors.js";
import { DARK_THEME, LIGHT_THEME } from "../../const.js";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { updateTheme } from "../../reducer.js";

export const ThemeSwitcher = () => {
  const currentTheme = useSelector(currentThemeSelector)
  const dispatch = useDispatch()
  console.log(currentTheme)
  const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME

  return (
    <button onClick={() => dispatch(updateTheme(nextTheme))}>
      {nextTheme === LIGHT_THEME ? <MdLightMode/> : <MdDarkMode/>}
    </button>
  )
}