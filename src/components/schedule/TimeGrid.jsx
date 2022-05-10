import React, {useState} from 'react';

import Hour from './Hour';

import './css/time_grid.min.css';

const getHours = () => {
    let arr = [];

    for(let i = 0; i < 24; i++) {
        arr.push(i);
    }

    return arr;
}

const hoursDefault = getHours();

export default function TimeGrid() {
    const [hours, setHours] = useState(hoursDefault);

    return (
        <div className={'time_grid'}>
            {
                hours.map((hour) => {
                    return (
                        <Hour key={hour}
                              hour={hour}
                        />
                    )
                })
            }
        </div>
    )
}