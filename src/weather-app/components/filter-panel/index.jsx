import { useDispatch, useSelector } from "react-redux";
import { cityNameFilterSelector, minPopulationFilterSelector } from "../../cities-data/selectors.js";
import { updateCityNameFilter, updateMinPopulationFilter } from "../../cities-data/reducer.js";

export const FilterPanel = () => {
  const cityName = useSelector(cityNameFilterSelector)
  const minPopulation = useSelector(minPopulationFilterSelector)
  const dispatch = useDispatch()

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", gap: "1rem", marginTop: "1rem" }}>
      <label>
        City Name: &nbsp;
        <input type="text" value={cityName}
               onChange={(e) => dispatch(updateCityNameFilter({ cityName: e.target.value }))}/>
      </label>
      <label>
        Min Population: &nbsp;
        <input type="range" name="minPopulation" min="0" max="10000000" value={minPopulation}
               onChange={(e) => dispatch(updateMinPopulationFilter({ minPopulation: e.target.valueAsNumber }))}/>
      </label>
      <span>Value: {minPopulation}</span>
    </div>
  )
}