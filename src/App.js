import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import CityList from './components/CityList/CityList';
import PrincipalWeather from './components/PrincipalWeather/PrincipalWeather';
import ExtendedPronostic from './components/ExtendedPronostic/ExtendedPronostic';
import moment from 'moment';



const App = () => {


  const [selectedCity, setselectedCity] = useState('');
  const [country, setCountry] = useState('')
  const [dataSelectedCity, setDataSelectedCity] = useState();
  const [pronostic, setPronostic] = useState([]);
  const [list, setList] = useState([])
  const apiId = 'b6e48678f6666f26e319929b9b9fae21';

  const selectToCity = async (cityName, id) => {
    const dataCity = list.filter(c => c.id === id);
    setDataSelectedCity(dataCity[0]);
    // setselectedCity(cityName)
    getExtendedWeather(cityName, country);
    setselectedCity(cityName);
  }

  useEffect(() => {
    callToIpApi();
  }, []);

  const callToIpApi = async () => {
    const respuestaIpApi = await fetch('http://ip-api.com/json');
    const dataIpApi = await respuestaIpApi.json();
    const { regionName, countryCode, lat, lon } = dataIpApi;
    setCountry(countryCode);
    setselectedCity(regionName);
    callToWeatherApi(lat, lon);
    getExtendedWeather(regionName, countryCode);
  }

  const callToWeatherApi = async (latitude, longitude) => {
    const URL = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=6&units=metric&appid=${apiId}`;

    const res = await fetch(URL);
    const data = await res.json();
    setList(data.list);
    setDataSelectedCity(data.list[0]);
    console.log('data.list', data.list)
    // selectToCity(data.list[0].name, data.list[0].id);
  }

  const getExtendedWeather = async (city, country) => {
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiId}`;
    const res = await fetch(URL);
    const data = await res.json();

    const daysArray = [];
    let filteredPronostic = [];
    data.list.forEach(pronostic => {
      const even = (element) => element === moment(pronostic.dt_txt).format('dddd');
      if (!daysArray.some(even)) {
        daysArray.push(moment(pronostic.dt_txt).format('dddd'));
        filteredPronostic.push(pronostic);
      }
    });

    console.log('filtered', filteredPronostic);
    setPronostic(filteredPronostic);
  }

  const changeBackgroundImage = rangeId => {
    switch (true) {
      // case rangeId >= 200 && rangeId <= 232:
      //     setIcon(weatherIcons.Thunderstorm);
      //     break;
      // case rangeId >= 300 && rangeId <= 321:
      //     setIcon(weatherIcons.Drizle);
      //     break;
      case rangeId >= 500 && rangeId <= 531:
        return 'rain';
      case rangeId >= 600 && rangeId <= 622:
          return 'snow';
      // case rangeId >= 701 && rangeId <= 781:
      //     setIcon(weatherIcons.Atmosphere);
      //     break;
      case rangeId === 800:
        return '';
      // case rangeId >= 801 && rangeId <= 804:
      //     setIcon(weatherIcons.Clouds);
      //     break;
      default:
        return '';
    }
  }

  return (
    <main className={`app ${changeBackgroundImage(dataSelectedCity.weather[0].id)}`}>
      <Header />
      <div className="container ">
        <div className="row mb-3">
          {dataSelectedCity && <PrincipalWeather info={dataSelectedCity} />}
        </div>
        <div className="row mb-4">
          {pronostic && <ExtendedPronostic pronostic={pronostic} />}
        </div>
        <div className="row">
          <div className="col-md-12 px-0" >
            {list && <CityList selectToCity={selectToCity} list={list} selectedCity={selectedCity} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
