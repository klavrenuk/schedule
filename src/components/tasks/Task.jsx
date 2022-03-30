import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, Input, Label, Row} from "reactstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

import './css/task.min.css';

export default function Task(props) {
    const [task, setTask] = useState(props.task, {});
    const [isDisabled, setIsDisabled] = useState(false);

    const clickPressListener = (event) => {
        if(!event.target.closest('.create_task')) {
            console.log('close');
            // props.toggleViewCreateTask(false);
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

    const onChange = (event) => setTask({
        ...task,
        name: event.target.value
    });

    console.log(task.name);

    return (
        <li className={'task'}>
            <Row className={'flex flex--align_center'}>
                <Col sm={8}>
                    <Input className={'task-checkbox'}
                           type={'checkbox'}
                           disabled={isDisabled}
                    />
                    <Input id={task._id.toString()}
                           value={task.name}
                           placeholder={'Please, enter name of task'}
                           className={'task-text'}
                           type="text"
                           disabled={true}
                           onKeyDown={(event) => onKeyDown(event)}
                           onChange={(event) => onChange(event)}
                    />
                </Col>
                <Col sm={4} className={'text-right task-controller'}>
                    <Button color={'icon'}>
                        <AiFillEdit />
                    </Button>
                    <Button color={'icon'}>
                        <AiFillDelete />
                    </Button>
                </Col>
            </Row>
        </li>
    )
}