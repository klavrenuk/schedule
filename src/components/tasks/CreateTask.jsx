import React from 'react';
import {Input, Row, Col} from "reactstrap";

import './css/create_task.min.css';

export default function CreateTask() {
    return (
        <li className={'create_task'}>
            <Input className={'create_task-checkbox'}
                   type="checkbox"
                   disabled={true}
            />
            <Input className={'create_task-text'}/>
        </li>
    )
}