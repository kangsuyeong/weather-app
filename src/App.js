import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨 화씨 날씨상태
// 3. 5개의 버튼이 있다. (현재위치,4개는 다른도시)
// 4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {
  const APIkey = "5362cec541c083991e02c3e90f43b99a";

  //state
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("current");
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const cities = ["paris", "new york", "tokyo", "seoul"];

  //현재 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      
      //ES6 Destructuring
      let {latitude,longitude} = position.coords
      // let latitude = position.coords.latitude;
      // let longitude = position.coords.longitude;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  // latitude, longitude에 따른 API 호출하기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false)
    }catch(err){
      setError(err.massage)
      setLoading(false)
    }
    
  };

  // city가 바뀌기 때문에 componentDidUpdate역할을 하는 useEffect가 실행된다.
  const getWeatherByCity = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`; //city는 state
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false)
    }catch(err){
      setError(err.massage)
      setLoading(false)
    }

  };

  // // componentDidUpdate역할 - city state를 주시하고 있다가 city가 바뀌면 useEffect함수가 호출됨
  // useEffect(()=>{
  //   getWeatherByCity()
  // },[city])

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []); //배열에 아무것도 안주면 componentDidMount(), render 후에 바로 실행된다.

  //위 두개를 합치기
  useEffect(() => {
    if (city === "current") {
      setLoading(true)
      getCurrentLocation();
    } else {
      setLoading(true)
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading?(
        <div className="container">
      <ClipLoader color="#f88c6b" loading={loading} size={150}/>
      </div>
      )
      :!error?
      (<div className="container">
      <WeatherBox weather={weather} />
      <WeatherButton cities={cities} setCity={setCity} selectCity={city}/>
    </div>):
    error
    }
      
    </div>
  );
}

export default App;
