import React from 'react';

import './css/events_for_day.min.css';

export default function EventsForDay(props) {
    return (
        <div className={'events_for_day'}>
            <ul>
                {
                    props.events.map((event) => {
                        return (
                            <li key={event._id}
                                className={'events_for_day-event'}
                            >{ event.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}