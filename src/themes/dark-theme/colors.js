import { WEATHER_NICE, WEATHER_NOT_NICE, WEATHER_PASSABLE } from "../../weather-app/cities-data/const.js";

export const colors = {
  background: '#282828',
  text: '#bcbcbc',
  border: '#9d9d9d',

  filterPanel: {
    background: '#2d2d2d',
  },

  footer: {
    background: '#2d2d2d',
  },

  nChart: {
    [WEATHER_NICE]: '#286a28',
    [WEATHER_PASSABLE]: '#9c5c32',
    [WEATHER_NOT_NICE]: '#8a2727'
  },

  tChart: {
    fill: '#598b6c'
  },

  pChart: {
    fill: '#183972'
  },

  spinner: {
    color: '#265426'
  }
}