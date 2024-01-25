import { combineEpics, ofType } from "redux-observable";
import { centerMapRequest, updateUsersGeolocation } from "./reducer.js";
import { map, Observable, startWith, switchMap } from "rxjs";
import { getUsersGeolocation } from "./utils.js";

const getUsersGeolocationEpic = (action$) => (
  action$.pipe(
    ofType(centerMapRequest.type),
    startWith("I'm here just for init and my value will be ignored"),
    switchMap(() => new Observable(getUsersGeolocation)),
    map((geolocation) => updateUsersGeolocation(geolocation))
  )
)

export const geolocationEpics = combineEpics(getUsersGeolocationEpic)