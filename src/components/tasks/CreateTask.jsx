import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import {Button} from "reactstrap";

import './css/create_task.min.css';

export default function CreateTask() {
    return (
        <li className={'create_task'}>
            <Button color={'empty'}
                    className={'create_task-btn'}
            >
                <AiOutlinePlus /> new task
            </Button>
        </li>
    )
}