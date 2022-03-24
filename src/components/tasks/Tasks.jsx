import React, {useState} from 'react';
import {Row, Col, Button} from "reactstrap";
import { IoCloseOutline } from "react-icons/io5";

import Tabs from './Tabs';
import TasksFooter from './TasksFooter';

import './css/tasks.min.css';
import TasksList from "./TasksList";

export default function Tasks() {
    const [view, setView] = useState('tasks');

    return (
        <aside className={'tasks'}>
            <Row className={'tasks-header'}>
                <Col sm={8}>
                    <div className={'tasks-container'}>
                        <Tabs setActionView={setView}
                              activeView={view}
                        />
                    </div>
                </Col>
                <Col sm={4} className={'text-right'}>
                    <Button color={'icon'}
                            className={'tasks-header-btn_close'}
                    >
                        <IoCloseOutline />
                    </Button>
                </Col>
            </Row>

            <TasksList />
            <TasksFooter />
        </aside>
    )
}