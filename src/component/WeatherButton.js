import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities,setCity,selectCity}) => {
  console.log("selectCity",selectCity)
  return (
    <div>
      <Button variant={selectCity==="current"?"outline-warning":"warning"} onClick={()=>setCity("current")}>Current Location</Button>
      
      {/* map은 반환값을 배열에 담아 반환한다. */}
      {/* 버튼을 누르면 city를 설정해준다. */}
      {cities.map((item,index)=>(
        <Button variant={selectCity===item?"outline-warning":"warning"} key={index} onClick={()=>setCity(item)}>{item}</Button>
      ))}
    </div>
  )
}

export default WeatherButton
