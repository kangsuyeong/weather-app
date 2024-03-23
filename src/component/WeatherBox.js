import React from 'react'

//destructing
const WeatherBox = ({weather}) => {
    console.log("weather?",weather)
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>{Math.floor(weather?.main.temp)}°C / {Math.floor(weather?.main.temp*9/5+32)}°F</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox
