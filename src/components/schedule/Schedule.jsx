import React from 'react';

import './schedule.min.css';

import TimeGrid from "./TimeGrid";

const Schedule = () => {
    return (
        <div className={'schedule'}>
            <div id={'ScheduleDay'}>Day</div>
            <div id={'TasksAllDay'}>Tasks for all day</div>
            <TimeGrid />
        </div>
    )
}

export default Schedule;