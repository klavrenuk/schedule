import React, {useState} from 'react';
import {Row, Col} from "reactstrap";

import Tabs from './Tabs';

import './css/tasks.min.css';

export default function Tasks() {
    const [view, setView] = useState('tasks');

    return (
        <aside className={'tasks'}>
            <Row className={'tasks-header'}>
                <Col sm={8}>
                    <Tabs setActionView={setView}
                          activeView={view}
                    />
                </Col>
                <Col sm={4} className={'text-right'}>
                    close
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    active view = { view }
                </Col>
            </Row>
        </aside>
    )
}