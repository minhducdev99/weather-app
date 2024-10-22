import styles from "./index.module.css";
import { Weather } from "../../types/weather";
import { OPENWEATHERMAP_DOMAIN } from "../../constants/common";

interface WeatherCardProps {
  data: Weather | null;
}

const WeatherCard = (props: WeatherCardProps) => {
  const { data } = props;

  const icon = data?.weather[0].icon;

  if (!data) {
    return <></>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.weatherIconWrapper}>
        <img
          className={styles.weatherIcon}
          src={`${OPENWEATHERMAP_DOMAIN}/img/w/${icon}.png`}
          alt="weather-icon"
        />
      </div>
      <div className={styles.weatherContent}>
        <p className={styles.cityName}>{data.name}</p>
        <p className={styles.temperatures}>{Math.round(data.main.temp)}°</p>
        <p className={styles.weather}>{data.weather[0].main}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
