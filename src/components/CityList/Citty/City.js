import React, {useState, useEffect} from 'react';

const City = ({city, selectToCity, selectedCity}) => {

    const [selectedValue, setselectedValue] = useState();

    useEffect(() => {
        if (selectedCity === city.name) {
            setselectedValue({color: '#0d6efd'})
        } else {
            setselectedValue({color: 'black'})
        }
    }, [selectedCity])

    const handleClick = () => {
        selectToCity(city.name, city.id)
    }

    return (
        <tr onClick={() => handleClick()} style={selectedValue}>
            <th scope="row">{city.name}</th>
            <td>{Number(city.main.temp).toFixed(1)}</td>
        </tr>
    )
}

export default City
