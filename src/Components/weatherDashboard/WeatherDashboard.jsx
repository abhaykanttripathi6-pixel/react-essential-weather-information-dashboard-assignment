import React, { useEffect, useState } from 'react';
import style from '../weatherDashboard/weatherDashboard.module.css';
import SearchInput from '../SearchInput/SearchInput';
import WeatherStats from '../weatherStats/WeatherStats';
import WeatherForecast from '../weatherForecast/WeatherForecast';

const WeatherDashboard = () => {

  const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const state = {
    time: new Date().toLocaleTimeString(),
    date: {
      weekday: new Date().getDay(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      year: new Date().getFullYear()
    }
  }

  const [dateTime, setDateTime] = useState(state);

  useEffect(() => {
    let updatedTime = setInterval(() => {
      setDateTime({
        time: new Date().toLocaleTimeString(),
        date: {
          weekday: new Date().getDay(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
          year: new Date().getFullYear()
        }
      }
      );
    }, 1000)

    return () => clearInterval(updatedTime);
  }, [])


  return (
    <div className={style.appWrapper}>

      <header>
        <div className={style.nameDateWrapper}>
          <h1 className={style.appName}>
            <span>SKY</span>
            <span>CAST</span>
          </h1>

          <div className={style.date}>
            <span>{dateTime.time}</span>
            <span>
              {weeks[dateTime.date.weekday]}, {months[dateTime.date.month]} {dateTime.date.date}, {dateTime.date.year}</span>
          </div>
        </div>

      </header>

      <main>
        <SearchInput />
        <WeatherStats />
        <WeatherForecast />
      </main>
    </div>
  )
}

export default WeatherDashboard;
