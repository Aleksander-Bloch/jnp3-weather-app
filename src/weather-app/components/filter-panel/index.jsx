import { useDispatch, useSelector } from "react-redux";
import { filtersSelector } from "../../cities-data/selectors.js";
import { updateFilters } from "../../cities-data/reducer.js";
import { FilterPanelWrapper } from "./FilterPanelWrapper.jsx";
import { CityNameFilterWrapper } from "./CityNameFilterWrapper.jsx";
import { MinPopulationFilterWrapper } from "./MinPopulationFilterWrapper.jsx";
import { formatNumber } from "../../../utils.js";

export const FilterPanel = () => {
  const { cityName, minPopulation } = useSelector(filtersSelector)
  const dispatch = useDispatch()

  return (
    <FilterPanelWrapper>
      <div>
        <CityNameFilterWrapper>
          <label>
            City Name: <br/>
            <input type="text" value={cityName}
                   onChange={(e) => dispatch(updateFilters({ cityName: e.target.value, minPopulation }))}/>
          </label>
        </CityNameFilterWrapper>
        <MinPopulationFilterWrapper>
          <label>
            Min Population: {formatNumber(minPopulation)} <br/>
            <input type="range" name="minPopulation" min="0" max="10000000" step="1000" value={minPopulation}
                   onChange={(e) => dispatch(updateFilters({ cityName, minPopulation: e.target.valueAsNumber }))}/>
          </label>
        </MinPopulationFilterWrapper>
      </div>
    </FilterPanelWrapper>
  )
}