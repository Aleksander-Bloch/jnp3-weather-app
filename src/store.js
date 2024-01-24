import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from "redux-observable";
import { GEOLOCATION_REDUCER_NAME, geolocationReducer } from "./weather-app/geolocation/reducer.js";
import { rootEpic } from "./epics.js";

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    [GEOLOCATION_REDUCER_NAME]: geolocationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(rootEpic);
