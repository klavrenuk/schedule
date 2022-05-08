import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import TimeGrid from "./TimeGrid";
import EventsForDay from "./EventsForDay";
import Day from './Day';

import './schedule.min.css';

const Schedule = () => {
    const state = useSelector(state => state);
    const [eventsForDay, setEventsForDay] = useState([]);

    useEffect(() => {
        const arr = getEventsAllDay();
        setEventsForDay(arr);

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
            <Day />
            <EventsForDay events={eventsForDay} />
            <TimeGrid />
        </div>
    )
}

export default Schedule;