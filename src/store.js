import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from "redux-observable";
import { GEOLOCATION_REDUCER_NAME, geolocationReducer } from "./weather-app/geolocation/reducer.js";
import { rootEpic } from "./epics.js";
import { CITIES_DATA_REDUCER_NAME, citiesDataReducer } from "./weather-app/cities-data/reducer.js";

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    [GEOLOCATION_REDUCER_NAME]: geolocationReducer,
    [CITIES_DATA_REDUCER_NAME]: citiesDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(rootEpic);
