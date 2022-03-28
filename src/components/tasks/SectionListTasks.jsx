import React from 'react';
import {Row, Col, Button, Label, Input} from 'reactstrap';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function SectionListTasks(props) {
    return (
        <ul>
            {
                props.list.map((task) => {
                    return (
                        <li key={task._id}>
                            <Row>
                                <Col sm={9}>
                                    <Input type="checkbox" />
                                    <Label>{ task.name }</Label>
                                </Col>
                                <Col sm={3} className={'text-right'}>
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
                })
            }
        </ul>
    )
}