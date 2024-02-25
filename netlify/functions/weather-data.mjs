import axios from "axios";

export const handler = async (event) => {
  try {
    const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json'
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY
    const { lat, lon } = event.queryStringParameters;
    const response = await axios.get(`${WEATHER_API_URL}?q=${lat},${lon}&key=${WEATHER_API_KEY}`)
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: error.toString(),
    }
  }
}