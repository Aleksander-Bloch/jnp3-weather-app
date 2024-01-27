import { combineEpics } from "redux-observable";
import { geolocationEpics } from "./weather-app/geolocation/epics.js";
import { citiesDataEpics } from "./weather-app/cities-data/epics.js";

export const rootEpic = combineEpics(geolocationEpics, citiesDataEpics)