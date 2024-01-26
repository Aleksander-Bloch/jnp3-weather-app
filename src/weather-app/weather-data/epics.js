import { combineEpics, ofType } from "redux-observable";
import { changeMapViewRequest, updateWeatherByTheCity } from "./reducer.js";
import { map, startWith, switchMap, from } from "rxjs";
import { compareCitiesByPopulationDesc, requestDataForCitiesWithinBounds } from "./utils.js";
import { MAX_CITIES } from "./const.js";

const getWeatherDataForCitiesEpic = (action$) => (
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
    switchMap(({ payload }) => from(requestDataForCitiesWithinBounds(payload))),
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
    map((cities) => updateWeatherByTheCity(cities))
  )
)

export const weatherDataEpics = combineEpics(getWeatherDataForCitiesEpic)