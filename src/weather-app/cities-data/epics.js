import { combineEpics, ofType } from "redux-observable";
import { changeMapViewRequest, setLoadingState, updateCitiesData } from "./reducer.js";
import { debounceTime, interval, map, switchMap } from "rxjs";
import {
  createDataForCitiesWithinBounds,
  updateCitiesDataWithWeatherData,
  updateCitiesDataWithWeatherDataWithCaching,
} from "./utils.js";
import { citiesDataSelector } from "./selectors.js";
import { CITIES_DATA_DOWNLOAD_DEBOUNCE_TIME_IN_MS, CITIES_DATA_REFRESH_INTERVAL_IN_MS } from "./const.js";

const getCitiesDataEpic = (action$, state$) => (
  action$.pipe(
    ofType(setLoadingState.type),
    switchMap(({ payload: bounds }) => createDataForCitiesWithinBounds(bounds)),
    switchMap((fetchedCities) => updateCitiesDataWithWeatherDataWithCaching(fetchedCities, citiesDataSelector(state$.value))),
    map(citiesData => updateCitiesData(citiesData))
  )
)

const initiateCitiesDataDownloadEpic = (action$) => (
  action$.pipe(
    ofType(changeMapViewRequest.type),
    debounceTime(CITIES_DATA_DOWNLOAD_DEBOUNCE_TIME_IN_MS),
    map(({ payload: bounds }) => setLoadingState(bounds))
  )
)

const refreshCitiesDataEpic = (action$, state$) => (
  interval(CITIES_DATA_REFRESH_INTERVAL_IN_MS).pipe(
    switchMap(() => updateCitiesDataWithWeatherData(citiesDataSelector(state$.value))),
    map(citiesData => updateCitiesData(citiesData))
  )
)

export const citiesDataEpics = combineEpics(getCitiesDataEpic, initiateCitiesDataDownloadEpic, refreshCitiesDataEpic)