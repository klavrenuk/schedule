import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col, Button} from "reactstrap";
import { IoCloseOutline } from "react-icons/io5";
import {io} from 'socket.io-client'

import Tabs from './Tabs';
import TasksFooter from './TasksFooter';

import './css/tasks.min.css';
import TasksList from "./TasksList";
import {useSelector} from "react-redux";

export default function Tasks() {
    const dispatch = useDispatch();
    const [view, setView] = useState('tasks');
    const state = useSelector(state => state);

    useEffect(() => {
        console.log('useEffect');

        setConnection();
    }, []);


    const setConnection = () => {
        const socket = io('ws://');

        console.log('setConnection');

        socket.on('connect', () => {
            console.log('connect', socket.id);
        });

        socket.on('tasks', (data) => {
            console.log('tasks', data);
        })

        socket.on('connect_error', (err) => {
            console.log('error', err);
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
        })
    }


    const createSection = (socket) => {
        console.log('function createSection');

        socket.emit('tasks', {name: 'Kirill'})
    }

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