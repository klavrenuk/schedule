import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import {Button} from "reactstrap";

import './css/new_task.min.css';

export default function NewTask(props) {
    return (
        <li className={'new_task'}>
            <Button color={'empty'}
                    className={'new_task-btn'}
                    onClick={() => props.toggleViewCreateTask(true)}
            >
                <AiOutlinePlus /> new task
            </Button>
        </li>
    )
}