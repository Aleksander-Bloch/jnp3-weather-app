import { combineEpics } from "redux-observable";
import { geolocationEpics } from "./weather-app/geolocation/epics.js";
import { weatherDataEpics } from "./weather-app/weather-data/epics.js";

export const rootEpic = combineEpics(geolocationEpics, weatherDataEpics)