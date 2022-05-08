import React, {useState} from 'react';

export default function Day() {
    const [day, setDay] = useState(new Date());

    const getDayName = () => {
        return day.toLocaleString('default',{
            weekday: 'long'
        });
    }

    return (
        <div className={'day'}>
            <span className={'day-number'}>{ day.getDate() }</span>
            <span className={'day-name'}>{getDayName()}</span>
        </div>
    )
}