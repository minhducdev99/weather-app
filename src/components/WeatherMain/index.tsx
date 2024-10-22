import styles from "./index.module.css";
import WeatherCard from "../WeatherCard";
import WeatherForm from "../WeatherForm";
import { citiesService } from "../../services/cities";
import { useEffect, useMemo, useState } from "react";
import { City } from "../../types/city";
import { weatherSerivce } from "../../services/weather";
import { Weather } from "../../types/weather";
import AlertError from "../AlertError";

const WeatherMain = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const getCities = async () => {
    try {
      const data = await citiesService.getCities();
      if (data) {
        setCities(data);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const getWeather = async (city: City | null) => {
    if (!city) {
      return;
    }
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await weatherSerivce.getWeather(city.coord);
      setWeather(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const weatherStyles = useMemo(() => {
    if (!weather) {
      return "";
    }
    const weatherId = weather?.weather[0]?.id;
    if (weatherId >= 200 && weatherId < 300) {
      // thunderstorm
      return styles.thunderstorm;
    }
    if (weatherId >= 300 && weatherId < 400) {
      // drizzle
      return styles.rainy;
    }
    if (weatherId >= 500 && weatherId < 600) {
      // rain
      return styles.rainy;
    }
    if (weatherId >= 600 && weatherId < 700) {
      // snow
      return styles.snow;
    }
    if (weatherId >= 700 && weatherId < 800) {
      // atmosphere
      return styles.thunderstorm;
    }
    if (weatherId === 800) {
      // clear sky
      return styles.clear;
    }
    if (weatherId > 800 && weatherId < 900) {
      // cloud
      return styles.cloudy;
    }
    if (weatherId >= 900 && weatherId < 910) {
      // extreme
      return styles.thunderstorm;
    }
    return "";
  }, [weather]);

  useEffect(() => {
    getCities();
  }, []);

  return (
    <main className={`${styles.main} ${weatherStyles}`}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Weather App</h1>
        <div className={styles.weatherForm}>
          <WeatherForm
            cities={cities}
            onCitySelected={(citySelected) => getWeather(citySelected)}
          />
        </div>
        {isError && (
          <div style={{ marginBottom: "20px" }}>
            <AlertError>Some thing went wrong</AlertError>
          </div>
        )}
        {isLoading ? (
          <p className={styles.loading}>Loading ....</p>
        ) : (
          <>{weather && <WeatherCard data={weather} />}</>
        )}
      </div>
    </main>
  );
};

export default WeatherMain;
