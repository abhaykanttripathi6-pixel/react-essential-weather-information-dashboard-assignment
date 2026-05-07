import React, { useState } from 'react';
import style from '../SearchInput/searchInput.module.css';
import {useWeatherContext} from '../../context/WeatherProvider';

const SearchInput = () => {

  const [searchCity, setSearchCity] = useState('');
  const {fetchWeatherData} = useWeatherContext();
  

  const handleSearch = (e)=>{

    if(e.type === 'keydown' && e.key !== 'Enter') return;
    
    if(searchCity.trim() === '') return;

    fetchWeatherData('weather',searchCity);
    fetchWeatherData('forecast',searchCity);

    return;
  };
  

  return (
    <div className={style.inputWrapper}>
      <input type="text" placeholder='Search city or country...' value={searchCity} onChange={(e)=>setSearchCity(e.target.value)} onKeyDown={(e)=>handleSearch(e)}/>
      <button type='submit' onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchInput;
