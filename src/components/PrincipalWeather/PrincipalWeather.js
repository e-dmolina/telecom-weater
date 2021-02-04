import React, { useState, useEffect } from 'react';
import 'weather-icons/css/weather-icons.css'
import './styles.css';


const PrincipalWeather = ({ info }) => {

    const [icon, setIcon] = useState('');

    useEffect(() => {
        formatIcons(info.weather[0].id)
    }, []);

    const weatherIcons = {
        Thunderstorm: "wi-thunderstorm",
        Drizle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog",
    }

    const formatIcons = (rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                setIcon(weatherIcons.Thunderstorm);
                break;
            case rangeId >= 300 && rangeId <= 321:
                setIcon(weatherIcons.Drizle);
                break;
            case rangeId >= 500 && rangeId <= 531:
                setIcon(weatherIcons.Rain);
                break;
            case rangeId >= 600 && rangeId <= 622:
                setIcon(weatherIcons.Snow);
                break;
            case rangeId >= 701 && rangeId <= 781:
                setIcon(weatherIcons.Atmosphere);
                break;
            case rangeId === 800:
                setIcon(weatherIcons.Clear);
                break;
            case rangeId >= 801 && rangeId <= 804:
                setIcon(weatherIcons.Clouds);
                break;
            default:
                setIcon(weatherIcons.Clear);
                break;
        }
    }

    return (
        <div className="principal-container mt-4 p-3">
            <h1 className="text-center">Temperatura en {info.name}</h1>
            <div className="row d-flex justify-content-center mb-2">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <i className={`wi ${icon} display-1`}></i>
                </div>
                <div className="col-md-3">
                    <span className="temp">{Number(info.main.temp).toFixed(1)}°c</span>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-2" style={{ height: '80px', fontSize: '30px' }}>
                    Mínima {Number(info.main.temp_min).toFixed(1)}°
                </div>
                <div className="col-md-2" style={{ height: '80px', fontSize: '30px' }}>
                    Máxima {Number(info.main.temp_max).toFixed(1)}°
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6 d-flex justify-content-center">
                    <div>
                        <div className="text-center"><i className="wi wi-humidity display-5"></i>
                        </div>
                        <div>
                            Humedad {info.main.humidity} %
                    </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center" style={{ height: '80px' }}>
                    <div>
                        <div className="text-center"><i className="wi wi-cloudy display-5"></i>
                        </div>
                        <div>
                            Nubes {info.clouds.all}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center" style={{ height: '80px' }}>
                    <div>
                        <div className="text-center"><i className="wi wi-strong-wind display-5"></i>
                        </div>
                        <div>
                            Viento {info.wind.speed}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center" style={{ height: '80px' }}>
                    <div>
                        <div className="text-center"><i className="wi wi-umbrella display-5"></i>
                        </div>
                        <div>

                            Precipitaciones {info.main.humidity}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrincipalWeather
