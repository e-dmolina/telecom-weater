import React, { useEffect } from 'react';
import City from '../Citty/City';
import './styles.css';


const CityList = ({selectToCity, list, selectedCity}) => {

    useEffect(() => {
        console.log('currentCity desde citylist',list)
    }, []);


    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Sugerencias</th>
                    <th scope="col">Temperatura</th>
                </tr>
            </thead>
            <tbody>
                {list.map((city, key) => <City key={key} city={city} selectToCity={selectToCity} selectedCity={selectedCity} />)}
            </tbody>
        </table>
    )
}

export default CityList
