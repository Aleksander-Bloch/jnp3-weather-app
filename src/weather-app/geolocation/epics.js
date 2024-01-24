import { combineEpics, ofType } from "redux-observable";
import { centerMapRequest, updateUsersGeolocation } from "./reducer.js";
import { map, startWith } from "rxjs";
import { getUsersGeolocation } from "./utils.js";

const getUsersGeolocationEpic = (action$) => (
  action$.pipe(
    ofType(centerMapRequest.type),
    startWith("I'm here just for init and my value will be ignored"),
    // FIXME: Use observable to retrieve user's geolocation
    map(() => updateUsersGeolocation(getUsersGeolocation())),
  )
)

export const geolocationEpics = combineEpics(getUsersGeolocationEpic)