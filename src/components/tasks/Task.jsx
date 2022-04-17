import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Row} from "reactstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

import InputInList from "./InputInList";

import './css/task.min.css';

export default function Task(props) {
    const [task, setTask] = useState(props.task || {name: ''});
    const [isEdit, setIsEdit] = useState(false);
    const [colInput, setColInput] = useState(9);
    const [isShowTaskController, setIsShowTaskController] = useState(true);

    useEffect(() => {
        if(props.isEdit) {
            onEdit();
        }

    }, [props]);

    const onSave = async (value) => {
        const item = {
            ...task,
            name: value
        };

        props.save(item);
        setIsEdit(false);
        setTask(item);

        setTimeout(() => {
            setColInput(9);
            setIsShowTaskController(true);
        }, 400);
    }

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
                    <InputInList
                        id={task._id ? task._id.toString() : 'TaskNewInput'}
                        classNames={'with_checkbox'}
                        value={task.name}
                        close={onSave}
                        parentElem={id()}
                        isEdit={isEdit}
                    />

                </Col>
                {
                    isShowTaskController && task._id ?
                        <Col sm={3} className={`text-right task-controller`}>
                            <Button color={'icon'}
                                    onClick={() => onEdit()}
                            >
                                <AiFillEdit />
                            </Button>
                            <Button color={'icon'}
                                    onClick={() => props.deleteTask(task)}
                            >
                                <AiFillDelete />
                            </Button>
                        </Col>
                        :
                        null
                }
            </Row>
        </li>
    )
}