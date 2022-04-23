import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Row} from "reactstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {useDispatch} from 'react-redux';

import InputInList from "./InputInList";

import './css/task.min.css';

export default function Task(props) {
    const dispatch = useDispatch();

    const [task, setTask] = useState(props.task || {name: ''});
    const [isEdit, setIsEdit] = useState(props.isEdit ? props.isEdit : false);
    const [colInput, setColInput] = useState(props.isEdit ? 12 : 9);
    const [isShowTaskController, setIsShowTaskController] = useState(true);

    const onDelete = () => dispatch({
        type: 'deleteTask',
        task: task
    });

    const save = async (value) => {
        const item = {
            ...task,
            name: value,
            sectionId: props.section._id
        };

        let type = 'createTask'
        if(item.hasOwnProperty('_id')) {
            type = 'editTask';
        }

        dispatch({
            type: type,
            task: item
        });

        setTask(item);
        closeEdit();
    }

    const closeEdit = () => {
        props.toggleViewCreateTask(true);
        setIsEdit(false);
        setColInput(9);
        setIsShowTaskController(true);
    }

    const openEdit = () => {
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
                        save={save}
                        parentElem={id()}
                        isEdit={isEdit}
                        close={closeEdit}
                    />

                </Col>
                {
                    isShowTaskController && task._id ?
                        <Col sm={3} className={`text-right task-controller`}>
                            <Button color={'icon'}
                                    onClick={() => openEdit()}
                            >
                                <AiFillEdit />
                            </Button>
                            <Button color={'icon'}
                                    onClick={() => onDelete(task)}
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