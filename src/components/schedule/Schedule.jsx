import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import './schedule.min.css';

import TimeGrid from "./TimeGrid";

const Schedule = () => {
    const state = useSelector(state => state);
    const [eventsAllDay, setEventsAllDay] = useState([]);

    useEffect(() => {
        const arr = getEventsAllDay();
        setEventsAllDay(arr);

    }, [state]);

    const getEventsAllDay = () => {
        return state.events.filter((event) => {
            if(event.isAllDay) {
                return event;
            }
        })
    }

    return (
        <div className={'schedule'}>
            <div id={'ScheduleDay'}>Day</div>
            <div id={'TasksAllDay'}>Tasks for all day</div>
            <TimeGrid />
        </div>
    )
}

export default Schedule;