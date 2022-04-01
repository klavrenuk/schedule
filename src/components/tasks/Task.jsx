import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, Input, Row} from "reactstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

import WrapClickListener from "./WrapClickListener";

import './css/task.min.css';

export default function Task(props) {
    const [task, setTask] = useState(props.task ? props.task : {});
    const [isEdit, setIsEdit] = useState(false);
    const [colInput, setColInput] = useState(9);
    const [isShowTaskController, setIsShowTaskController] = useState(true);

    const destroyListener = () => {
        setIsEdit(false);

        setTimeout(() => {
            setColInput(9);
            setIsShowTaskController(true);
        }, 300);
    }

    const onKeyDown = (event) => {
        if(event.code === 'Enter' || event.code === 'Escape') {
            setIsEdit(false);
        }
    }

    const onChange = (event) => setTask({
        ...task,
        name: event.target.value
    });

    const onEdit = () => {
        setIsEdit(true);
        setColInput(12);
        setIsShowTaskController(false);
    }

    const id = () => {
        if(task.hasOwnProperty('_id')) {
            return `task-${task.sectionId}-${task._id}`;
        } else {
            return 'TaskNew';
        }
    }

    return (
        <li id={id()}
            className={'task item_for_editing'}
        >
            <Row className={'flex flex--align_center row--task'}>
                <Col sm={colInput}>
                    <Input className={'task-checkbox'}
                           type={'checkbox'}
                           disabled={isEdit}
                    />
                    <Input id={task._id ? task._id.toString() : 'TaskNewInput'}
                           className={`task-text item_for_editing-text ${isEdit ? 'active' : ''}`}
                           value={task.name}
                           placeholder={'Please, enter name of task'}
                           onKeyDown={(event) => onKeyDown(event)}
                           onChange={(event) => onChange(event)}
                           onClick={() => onEdit()}
                    />
                </Col>
                {
                    isShowTaskController ?
                        <Col sm={3} className={`text-right task-controller`}>
                            <Button color={'icon'}
                                    onClick={() => onEdit()}
                            >
                                <AiFillEdit />
                            </Button>
                            <Button color={'icon'}>
                                <AiFillDelete />
                            </Button>
                        </Col>
                        :
                        null
                }
            </Row>

            <WrapClickListener parentElem={'#' + id()}
                               isEdit={isEdit}
                               destroyListener={destroyListener}
            />
        </li>
    )
}