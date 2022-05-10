import React, {useState} from 'react';

import './css/day.min.css';

export default function Day() {
    const [day, setDay] = useState(new Date());

    const getDayName = () => {
        return day.toLocaleString('default',{
            weekday: 'short'
        });
    }

    const dayClassNames = `day ${ [6,0].includes(day.getDay()) ? 'day-off' : '' }`;

    return (
        <div className={dayClassNames}>
            <span className={'day-number'}>{ day.getDate() }</span>
            <span className={'day-name'}>{getDayName()}</span>
        </div>
    )
}