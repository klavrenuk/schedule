import React, {useRef} from 'react';

import ScheduleEvent from "./ScheduleEvent";
import Event from './../event/Event';

import './css/events_for_day.min.css';

export default function EventsForDay(props) {
    const RefEvent = useRef();

    const createNewEvent = () => RefEvent.current.show();

    return (
        <div className={'events_for_day'}>
            <a className={'events_for_day-link'}
               onClick={() => createNewEvent()}
            ></a>

            {
                props.events.lenght === 0 ? null :
                    <ul className={'events_for_day-list'}>
                        {
                            props.events.map((event) => {
                                return (
                                    <li key={event._id}>
                                        <ScheduleEvent event={event} />
                                    </li>
                                )
                            })
                        }
                    </ul>
            }

            <Event ref={RefEvent} type='modal' />
        </div>
    )
}