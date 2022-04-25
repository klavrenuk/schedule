import React from 'react';

import './css/hour.min.css';

export default function Hour(props) {
    const renderHourToString = hour => {
        if(hour < 10) {
            return `0${hour}:00`;
        } else {
            return `${hour}:00`;
        }
    }

    return (
        <div className={'hour'}>
            <div className={'hour-left_side'}>
                <span className={'left_side-hour'}>
                    {renderHourToString(props.hour)}
                </span>
            </div>

            <div className={'hour-line'}></div>
        </div>
    )
}