import React from 'react';
import style from './weatherStats.module.css';
import img from '../../assets/sun.png';
import {useWeatherContext} from '../../context/WeatherProvider';
import Loading from '../loading/Loading';
import Error from '../error/Error';

const WeatherStats = () => {

  const { weatherData, cityNotFound, error,forecastData} = useWeatherContext();
  // console.log('weatherdata',weatherData);
  
  
  if(cityNotFound){
    return <div>City not found !!</div>
  }
  
    if(error){
        return <Error />
    }

    if (!forecastData) {
        return <Loading />
    }

  const {name,main:{temp,feels_like,humidity,pressure}, weather , visibility, wind:{speed} } = weatherData;
  

  return (
    <div className={style.statsWrapper}>
      <div className={style.upper}>
        <h1>{name}</h1>
        <p>United States - Manhattan</p>
      </div>

      <div className={style.mid}>
        <h2>
          <span>{temp}</span>
          <span>°C</span>
        </h2>
        <p>{weather[0]?.description} - Feels like {feels_like}</p>
      </div>

      <div className={style.lower}>
        <div>
          <span>Humidity</span>
          <span>{humidity}%</span>
        </div>
        <div>
          <span>Visibility</span>
          <span>{visibility/1000} km</span>
        </div>
        <div>
          <span>pressure</span>
          <span>{pressure} hPa</span>
        </div>
        <div>
          <span>wind</span>
          <span>{speed} M/s</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherStats;
