export const getUsersGeolocation = (observer) => {
  navigator.geolocation.getCurrentPosition(
    position => {
      observer.next({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
      observer.complete()
    },
    error => observer.error(error),
  )
}