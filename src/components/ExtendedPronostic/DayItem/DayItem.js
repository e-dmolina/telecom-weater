import React, {useState, useEffect} from 'react';
import moment from 'moment';
import 'moment/locale/es';
import './styles.css';

const DayItem = ({ info }) => {
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
        <div className="col-sm-2">
            <div className="card">
                <div className="card-body text-center">
                    <h2 className="card-title">{moment(info.dt_txt).format('dddd')}</h2>
                    <h5 className="card-title">Min{Number(info.main.temp_min).toFixed(1)}</h5>
                    <h5 className="card-title">Max{Number(info.main.temp_max).toFixed(1)}</h5>
                    <div className="card-body">
                        <i className={`wi ${icon} display-1`}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayItem
