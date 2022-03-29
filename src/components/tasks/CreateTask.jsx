import React, {memo, useEffect, useMemo, useState} from 'react';
import {Input} from "reactstrap";

import './css/create_task.min.css';

export default function CreateTask(props) {
    const [value, setValue] = useState(props.value || '');

    const clickPressListener = (event) => {
        if(!event.target.closest('.create_task')) {
            props.toggleViewCreateTask(false);
        }
    }

    const memoizedListener = useMemo(() => clickPressListener, []);

    useEffect(() => {
        window.addEventListener('click', memoizedListener);

        return() => {
            window.removeEventListener('click', memoizedListener);
        };
    }, [memoizedListener]);

    const onKeyDown = (event) => {
        if(event.code === 'Enter') {
            props.toggleViewCreateTask(false);
        }
    }

    const onChange = (event) => setValue(event.target.value);

    return (
        <li className={'create_task'}>
            <Input className={'create_task-checkbox'}
                   type="checkbox"
                   disabled={true}
            />
            <Input className={'create_task-text'}
                   onKeyDown={(event) => onKeyDown(event)}
                   onChange={(event) => onChange(event)}
                   value={value}
                   placeholder={'Please, enter name of task'}
            />
        </li>
    )
}