import React, {useState} from 'react';

import './css/day.min.css';

export default function Day() {
    const [day, setDay] = useState(new Date());

    const getDayName = () => {
        return day.toLocaleString('default',{
            weekday: 'short'
        });
    }

    return (
        <div className={'day'}>
            <span className={'day-number'}>{ day.getDate() }</span>
            <span className={'day-name'}>{getDayName()}</span>
        </div>
    )
}