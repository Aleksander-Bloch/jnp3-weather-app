import { combineEpics, ofType } from "redux-observable";
import { changeMapViewRequest, setLoadingState, updateCitiesData } from "./reducer.js";
import { debounceTime, forkJoin, from, map, switchMap, tap } from "rxjs";
import {
  compareCitiesByPopulationDesc,
  requestDataForCitiesWithinBounds,
  requestWeatherDataForGeolocation
} from "./utils.js";
import { MAX_CITIES } from "./const.js";
import { citiesDataSelector } from "./selectors.js";

const getCitiesDataEpic = (action$, state$) => (
  action$.pipe(
    ofType(setLoadingState.type),
    switchMap(({ payload }) =>
      from(requestDataForCitiesWithinBounds(payload)).pipe(
        map((response) => response.data.elements
          .filter((city) => city.tags.population !== null && city.tags.population !== undefined)
          .sort(compareCitiesByPopulationDesc)
          .slice(0, MAX_CITIES)
          .map((city) => ({
            id: city.id,
            lat: city.lat,
            lon: city.lon,
            name: city.tags.name,
            population: city.tags.population
          }))
        ),
      )
    ),
    switchMap((cities) => forkJoin(
      cities
        .filter((city) => !citiesDataSelector(state$.value)
          .some((knownCity) => knownCity.id === city.id))
        .map((city) => from(
            requestWeatherDataForGeolocation(city.lat, city.lon)
          )
            .pipe(
              map((response) => response.data.current),
              map((currentWeather) => ({
                ...city,
                weather: {
                  precip_mm: currentWeather.precip_mm,
                  temp_c: currentWeather.temp_c,
                  icon: currentWeather.condition.icon,
                }
              }))
            )
        )
    ).pipe(
      map((newCitiesWeatherData) => newCitiesWeatherData.concat(
        citiesDataSelector(state$.value).filter((knownCity) => cities
          .some((city) => city.id === knownCity.id))
      ))
    )),
    map(citiesWeatherData => updateCitiesData(citiesWeatherData))
  )
)

const initiateCitiesDataDownloadEpic = (action$) => (
  action$.pipe(
    ofType(changeMapViewRequest.type),
    debounceTime(5000),
    map(({ payload }) => setLoadingState(payload))
  )
)

export const citiesDataEpics = combineEpics(getCitiesDataEpic, initiateCitiesDataDownloadEpic)