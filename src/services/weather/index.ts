import {
  OPENWEATHERMAP_API_DOMAIN,
  OPENWEATHERMAP_API_KEY,
} from "../../constants/common";
import { Coord } from "../../types/city";
import { Weather } from "../../types/weather";

export const weatherSerivce = {
  async getWeather(params: Coord) {
    const response = await fetch(
      `${OPENWEATHERMAP_API_DOMAIN}/weather?lat=${params.lat}&lon=${params.lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Http error with status ${response.status}`);
    }
    const data: Weather = await response.json();
    return data;
  },
};
