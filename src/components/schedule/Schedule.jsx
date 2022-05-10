import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useSelector} from "react-redux";

import TimeGrid from "./TimeGrid";
import EventsForDay from "./EventsForDay";
import Day from './Day';

import './schedule.min.css';

const marginBottom = 16;

const Schedule = () => {
    const state = useSelector(state => state);
    const [eventsForDay, setEventsForDay] = useState([]);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        const arr = getEventsAllDay();
        setEventsForDay(arr);

    }, [state]);

    useEffect(() => {
        calcHeight();
        window.addEventListener('resize', calcHeight);

        return () => {
            window.removeEventListener('resize', calcHeight);
        }
    }, []);

    const calcHeight = () => {
        const elms = ['DashboardHeader'];
        const docHeight = window.innerHeight;

        let item = null,
            sumElms = marginBottom || 0;

        for(let elem of elms) {
            item = document.querySelector(`#${elem}`);

            if(item) {
                sumElms += item.clientHeight;
            }
        }

        setHeight(docHeight - sumElms);
    }

    const getEventsAllDay = () => {
        return state.events.filter((event) => {
            if(event.isAllDay) {
                return event;
            }
        })
    }

    return (
        <div className={'schedule custom_scrollbar'}
             style={{
                 'height': height,
                 'marginBottom': marginBottom
             }}
        >
            <Day />
            <EventsForDay events={eventsForDay} />
            <TimeGrid />
        </div>
    )
}

export default Schedule;