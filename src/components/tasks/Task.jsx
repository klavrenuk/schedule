import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, Input, Row} from "reactstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

import './css/task.min.css';

export default function Task(props) {
    const [task, setTask] = useState(props.task ? props.task : {});
    const [isEdit, setIsEdit] = useState(false);

    const clickPressListener = (event) => {
        if(!event.target.closest('.task')) {
            setIsEdit(false);
            window.removeEventListener('click', memoizedListener);
        }
    }

    const memoizedListener = useMemo(() => clickPressListener, []);

    useEffect(() => {
        if(isEdit) {
            window.addEventListener('click', memoizedListener);
        }
    }, [memoizedListener, isEdit]);

    const onKeyDown = (event) => {
        if(event.code === 'Enter') {
            setIsEdit(false);
        }
    }

    const onChange = (event) => setTask({
        ...task,
        name: event.target.value
    });

    const onEdit = () => setIsEdit(true);

    const id = () => {
        if(task.hasOwnProperty('_id')) {
            return `task-${task.sectionId}-${task._id}`;
        } else {
            return 'TaskNew';
        }
    }

    return (
        <li id={id()}
            className={isEdit ? 'task task--editing' : 'task'}
        >
            <Row className={'flex flex--align_center row--task'}>
                <Col sm={ isEdit ? 12 : 9 }>
                    <Input className={'task-checkbox'}
                           type={'checkbox'}
                           disabled={isEdit}
                    />
                    <Input id={task._id ? task._id.toString() : 'TaskNewInput'}
                           value={task.name}
                           placeholder={'Please, enter name of task'}
                           className={'task-text'}
                           type="text"
                           onKeyDown={(event) => onKeyDown(event)}
                           onChange={(event) => onChange(event)}
                           onClick={() => onEdit()}
                    />
                </Col>
                <Col sm={3} className={'text-right task-controller'}>
                    <Button color={'icon'}
                            onClick={() => onEdit()}
                    >
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