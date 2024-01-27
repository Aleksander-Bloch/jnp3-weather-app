import { combineEpics, ofType } from "redux-observable";
import { changeMapViewRequest, updateCitiesData } from "./reducer.js";
import { forkJoin, from, map, startWith, switchMap } from "rxjs";
import {
  compareCitiesByPopulationDesc,
  requestDataForCitiesWithinBounds,
  requestWeatherDataForGeolocation
} from "./utils.js";
import { MAX_CITIES } from "./const.js";

const getCitiesDataEpic = (action$) => (
  action$.pipe(
    ofType(changeMapViewRequest.type),
    startWith({
      payload: {
        south: 52.06262321411286,
        west: 18.594360351562504,
        north: 52.3923633970718,
        east: 23.4228515625,
      }
    }),
    switchMap(({ payload }) =>
      from(requestDataForCitiesWithinBounds(payload)).pipe(
        map((response) => response.data.elements
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
      cities.map((city) => from(
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
    )),
    map(citiesWeatherData => updateCitiesData(citiesWeatherData))
  )
)

export const citiesDataEpics = combineEpics(getCitiesDataEpic)