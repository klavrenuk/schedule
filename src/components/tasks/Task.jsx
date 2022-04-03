import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Input, Row} from "reactstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

import WrapClickListener from "./WrapClickListener";

import './css/task.min.css';

export default function Task(props) {
    const [task, setTask] = useState(props.task || {name: ''});
    const [isEdit, setIsEdit] = useState(false);
    const [colInput, setColInput] = useState(9);
    const [isShowTaskController, setIsShowTaskController] = useState(true);
    const [isChanging, setIsChanging] = useState(false);

    const RefWrapClickListener = useRef();


    useEffect(() => {
        if(!isEdit && isChanging) {
            RefWrapClickListener.current.removeListener();

            setTimeout(() => {
                setIsChanging(false);
                props.save(task);
            }, 300);
        }

    }, [isEdit]);


    const destroyListener = () => {
        setIsChanging(true);
        setIsEdit(false);

        setTimeout(() => {
            setColInput(9);
            setIsShowTaskController(true);
        }, 300);
    }


    const onKeyDown = (event) => {
        if(event.code === 'Enter' || event.code === 'Escape') {
            setIsEdit(false);
            setIsChanging(true);
        }
    }

    const onChange = (event) => {
        setTask({
            ...task,
            name: event.target.value
        });
        setIsChanging(true);
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

            <WrapClickListener parentElem={'#' + id()}
                               isEdit={isEdit}
                               destroyListener={destroyListener}
                               ref={RefWrapClickListener}
            />
        </li>
    )
}