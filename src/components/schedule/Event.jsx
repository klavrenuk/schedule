import React, {useState} from 'react';
import {Button} from 'reactstrap';

import './css/event.min.css';

export default function Event(props) {
    if(!props.event) {
        return false;
    }

    const [event, setEvent] = useState(props.event);

    const onClickEvent = () => console.log(event);

    return (
        <Button color={'empty'}
                className={'event'}
                onClick={() => onClickEvent()}
        >{event.name}</Button>
    )
}