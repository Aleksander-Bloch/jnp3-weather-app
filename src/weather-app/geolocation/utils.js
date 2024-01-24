export const getUsersGeolocation = () => {
  let latitude = 0
  let longitude = 0

  console.log("utils.js: getUsersGeolocation")

  function success(position) {
    console.log(position)
    latitude = position.coords.latitude
    longitude = position.coords.longitude
  }

  // FIXME: getCurrentPosition is asynchronous, returned lat and long are always 0
  navigator.geolocation.getCurrentPosition(success)
  console.log(latitude, longitude)

  return { latitude, longitude }
}