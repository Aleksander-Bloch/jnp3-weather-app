import { combineEpics } from "redux-observable";
import { geolocationEpics } from "./weather-app/geolocation/epics.js";

export const rootEpic = combineEpics(geolocationEpics)