import React from 'react'
import DayItem from './DayItem/DayItem';

const ExtendedPronostic = ({pronostic}) => {
    console.log('desde extendedpronostic', pronostic)
    return (
        <div className="px-0">
            <h2>Pronóstico extendido</h2>
            <div className="row d-flex justify-content-between">
                {pronostic && pronostic.map((p, index) => index !== 0 && <DayItem key={p.dt} info={p}/>)}
            </div>
        </div>
    )
}

export default ExtendedPronostic
