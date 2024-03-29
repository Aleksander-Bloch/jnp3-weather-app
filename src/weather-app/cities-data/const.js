export const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter"
export const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json"
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
export const MAX_CITIES = 20

export const CITIES_DATA_DOWNLOAD_DEBOUNCE_TIME_IN_MS = 2000

export const CITIES_DATA_REFRESH_INTERVAL_IN_MS = 60 * 60 * 1000

export const NICE_TEMP_RANGE = {
  min: 18,
  max: 25,
}

export const WEATHER_NICE = 'nice'
export const WEATHER_PASSABLE = 'passable'

export const WEATHER_NOT_NICE = 'not_nice'

export const WEATHER_ATTRIBUTES = {
  [WEATHER_NICE]: {
    text: 'Nice',
    emoji: '🤠',
  },
  [WEATHER_PASSABLE]: {
    text: 'Passable',
    emoji: '😑',
  },
  [WEATHER_NOT_NICE]: {
    text: 'Not Nice',
    emoji: '🙁',
  }
}

export const PRESSURE_UNIT = 'hPa'
export const TEMPERATURE_UNIT = '°C'
