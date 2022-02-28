import React from 'react';

import './schedule.min.css';

import TimeGrid from "./TimeGrid";

const Schedule = () => {
    return (
        <div className={'schedule'}>
            <div>Day</div>
            <div>Tasks for all day</div>
            <TimeGrid />
        </div>
    )
}

export default Schedule;