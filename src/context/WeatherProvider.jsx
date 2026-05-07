import React, { createContext, useContext, useEffect, useState } from 'react';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {

    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForcasteData] = useState(null);
    const [error, setError] = useState(false);
    const [cityNotFound, setCityNotFOund] = useState(false);


    async function fetchWeatherData(endpoint, searchCity) {

        try {
            setCityNotFOund(false);
            setError(false);
            const res = await fetch(`https://api.openweathermap.org/data/2.5/${endpoint}?q=${searchCity}&appid=c2e7b86cfda1cf0aa202a33a019cee19&units=metric`);
            const data = await res.json();
            console.log(data);
            if (data.cod === '404') {
                setCityNotFOund(true);
                return;
            }
            if (endpoint === 'forecast') setForcasteData(data.list);
            if (endpoint === 'weather') setWeatherData(data);
        } catch (err) {
            setError(true);
        }

    };

    useEffect(() => {
        fetchWeatherData('weather', 'allahabad');
        fetchWeatherData('forecast', 'allahabad');
        return;
    }, [])


    return (
        <WeatherContext.Provider value={{ weatherData, forecastData, fetchWeatherData, cityNotFound, error}}>
            {children}
        </WeatherContext.Provider>
    )
}

const useWeatherContext = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeatherContext must be use inside the Weather Provider');
    }

    return context;
}

export { WeatherProvider, useWeatherContext };

