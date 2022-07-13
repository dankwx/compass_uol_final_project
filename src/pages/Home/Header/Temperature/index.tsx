import styles from "./Temperature.module.scss";
import { ReactComponent as Cloud } from "./cloud-ico.svg";
import { useEffect, useState } from "react";

export default function Temperature() {
  const [temperature, setTemperature] = useState<number>(0);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    const getTemperature = async () => {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Mafra,br&appid=1b80fdb1720dd149b56848e6c48fb8d2"
      );
      const data = await response.json();
      const temperature = Math.round(data.main.temp - 273.15);
      setTemperature(temperature);
    };
    getTemperature();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Mafra,br&appid=1b80fdb1720dd149b56848e6c48fb8d2"
      );
      const data = await response.json();
      const location = data.name;
      setLocation(location);
    };
    getLocation();
  }, []);

  return (
    <div className={styles.content}>
      <h3 className={styles.city}>{location} - SC</h3>

      <div className={styles.temperature}>
        <Cloud width={60} height={35} />
        <h2 className={styles.cityTemp}>{temperature}º</h2>
      </div>
    </div>
  );
}
