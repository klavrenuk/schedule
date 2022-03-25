import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col, Button} from "reactstrap";
import { IoCloseOutline } from "react-icons/io5";

import Tabs from './Tabs';
import TasksFooter from './TasksFooter';

import './css/tasks.min.css';
import TasksList from "./TasksList";
import {useSelector} from "react-redux";

export default function Tasks() {
    const dispatch = useDispatch();
    const [view, setView] = useState('tasks');
    const state = useSelector(state => state);

    const onCloseModalTasks = () => dispatch({
        type: 'toggleModalTasks'
    });


    if(!state.isShowModalTasks) {
        return null;
    } else {
        return (
            <aside className={'tasks border_top border_top--grey'}>
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
                                onClick={() => onCloseModalTasks()}
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
}