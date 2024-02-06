import { useDispatch, useSelector } from "react-redux";
import { filtersSelector } from "../../cities-data/selectors.js";
import { updateFilters } from "../../cities-data/reducer.js";

export const FilterPanel = () => {
  const { cityName, minPopulation } = useSelector(filtersSelector)
  const dispatch = useDispatch()

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", gap: "1rem", marginTop: "1rem" }}>
      <label>
        City Name: &nbsp;
        <input type="text" value={cityName}
               onChange={(e) => dispatch(updateFilters({ cityName: e.target.value, minPopulation }))}/>
      </label>
      <label>
        Min Population: &nbsp;
        <input type="range" name="minPopulation" min="0" max="10000000" value={minPopulation}
               onChange={(e) => dispatch(updateFilters({ cityName, minPopulation: e.target.valueAsNumber }))}/>
      </label>
      <span>Value: {minPopulation}</span>
    </div>
  )
}