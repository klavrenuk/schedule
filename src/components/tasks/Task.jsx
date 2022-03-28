import React from 'react';
import {Button, Col, Input, Label, Row} from "reactstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

import './css/task.min.css';

export default function Task(props) {
    const task = props.task;

    return (
        <li className={'task'}>
            <Row className={'flex flex--align_center'}>
                <Col sm={8}>
                    <Input id={task._id.toString()}
                           type="checkbox"
                    />
                    <Label className={'task-label'}
                           for={task._id.toString()}
                    >{ task.name }</Label>
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