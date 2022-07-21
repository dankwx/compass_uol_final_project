import styles from './Temperature.module.scss';
import { ReactComponent as Cloud } from './cloud-ico.svg';
import { useEffect, useState } from 'react';

export default function Temperature() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=1b80fdb1720dd149b56848e6c48fb8d2`
          )
            .then((response) => response.json())
            .then((data) => {
              const temperature = Math.round(data.main.temp - 273.15);
              setTemperature(temperature);
            });
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error) => {
          fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=Sao Paulo&appid=1b80fdb1720dd149b56848e6c48fb8d2'
          )
            .then((response) => response.json())
            .then((data) => {
              const temperature = Math.round(data.main.temp - 273.15);
              setTemperature(temperature);
            });
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const [temperature, setTemperature] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    setCity('São Paulo');
    if (coordinates.latitude && coordinates.longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=1b80fdb1720dd149b56848e6c48fb8d2`
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.name);
        });
    } else {
      setCity('São Paulo');
    }
  }, [coordinates]);

  useEffect(() => {
    if (city === 'Mafra') {
      setState('SC');
    } else if (city === 'Rio Negro') {
      setState('PR');
    } else {
      setState('SP');
    }
  }, [city]);

  return (
    <div className={styles.content}>
      <h3 className={styles.city}>
        {city} - {state}
      </h3>
      <div className={styles.temperature}>
        <Cloud width={60} height={35} />
        <h2 className={styles.cityTemp}>{temperature}º</h2>
      </div>
    </div>
  );
}
