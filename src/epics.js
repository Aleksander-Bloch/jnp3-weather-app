import { combineEpics } from "redux-observable";
import { citiesDataEpics } from "./weather-app/cities-data/epics.js";

export const rootEpic = combineEpics(citiesDataEpics)