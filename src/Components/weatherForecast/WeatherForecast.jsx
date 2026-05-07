import React, { useEffect } from 'react';
import style from '../weatherForecast/weatherForecast.module.css';
import Thunderstorm from '../../assets/storm.png';
import Drizzle from '../../assets/drizzle.png';
import Rain from '../../assets/rainy-day.png';
import Snow from '../../assets/snow.png';
import Clouds from '../../assets/cloud.png';
import Haze from '../../assets/haze.png';
import Sun from '../../assets/sun.png';
import { useWeatherContext } from '../../context/WeatherProvider';
import Loading from '../loading/Loading';
import Error from '../error/Error';

const WeatherForecast = () => {

    const { forecastData, error } = useWeatherContext();

    if(error){
        return <Error />
    }

    if (!forecastData) {
        return <Loading />
    }

    return (
        <div className={style.forecastWrapper}>

            <div className={style.forecastHeading}>
                <h2>Weather Forecast</h2>
            </div>

            <div className={style.forecastInfoContainer}>

                {forecastData.map((data) => {

                    const { dt, dt_txt, main: { temp }, weather: [{ id }] } = data;

                    if (dt_txt.slice(11) !== '12:00:00') return;

                    let weatherIcon;

                        switch(true){
                            case (id >= 200 && id <= 232):
                                weatherIcon = Thunderstorm;
                                break;

                            case (id >= 300 && id <= 321):  
                                weatherIcon =  Drizzle;
                                break;

                            case (id >= 500 && id <= 531):
                                weatherIcon = Rain;
                                break; 
                                
                            case (id >= 600 && id <= 622):
                                weatherIcon = Snow;
                                break;

                            case (id >= 701 && id <= 781):
                                weatherIcon = Haze;
                                break;

                            case (id >= 801 && id <= 804):
                                weatherIcon = Clouds;
                                break;
                            
                            default:
                                weatherIcon = Sun;
                        }


                    return (
                        <div key={dt} className={style.forecastDetails}>
                            <span>{new Date(dt_txt.slice(0, 11)).toDateString()}</span>
                            <span><img src={weatherIcon} alt='weather-icon' /></span>
                            <span>{Math.floor(temp)}°C</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WeatherForecast;
