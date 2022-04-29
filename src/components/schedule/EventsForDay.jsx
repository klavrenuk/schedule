import React from 'react';

import Event from "./Event";

import './css/events_for_day.min.css';

export default function EventsForDay(props) {
    return (
        <div className={'events_for_day'}>
            <ul className={'events_for_day-list'}>
                {
                    props.events.map((event) => {
                        return (
                            <li key={event._id}>
                                <Event event={event} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}