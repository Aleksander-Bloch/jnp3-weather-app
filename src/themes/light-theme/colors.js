import { WEATHER_NICE, WEATHER_NOT_NICE, WEATHER_PASSABLE } from "../../weather-app/cities-data/const.js";

export const colors = {
  background: '#FFFFFF',
  text: '#000000',
  border: '#969696',

  filterPanel: {
    background: '#f8f8f8',
  },

  footer: {
    background: '#f8f8f8',
  },

  nChart: {
    [WEATHER_NICE]: '#55d555',
    [WEATHER_PASSABLE]: '#ff9a57',
    [WEATHER_NOT_NICE]: '#be3838'
  },

  tChart: {
    fill: '#8bd8a5'
  },

  pChart: {
    fill: '#2e67d0'
  },

  spinner: {
    color: '#4fa94d'
  }
}