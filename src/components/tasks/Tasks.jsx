import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Button} from "reactstrap";
import { IoCloseOutline } from "react-icons/io5";

import Tabs from './Tabs';
import TasksFooter from './TasksFooter';
import TasksList from "./TasksList";

import './css/tasks.min.css';

export default function Tasks() {
    const [view, setView] = useState('tasks');

    const state = useSelector(state => state);
    const dispatch = useDispatch();


    useEffect(() => {
        console.log('effect', state);
    }, [state.tasks]);


    const createSection = () => dispatch({
        type: 'createSection'
    });

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
                <TasksFooter createSection={createSection}/>
            </aside>
        )
    }
}