import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Button} from "reactstrap";

import Tabs from './Tabs';
import Loading from "../general/Loading";
import ContainerTasksInWork from "./ContainerTasksInWork";
import TasksList from "./TasksList";

import './css/tasks.min.css';

const options = ['tasks', 'completed'];

export default function Tasks() {
    const [view, setView] = useState('tasks');
    const [isLoading, setIsLoading] = useState(false);
    const [isQuery, setIsQuery] = useState(true);

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isLoading) {
            setIsLoading(false);
        }

        if(isQuery) {
            setIsLoading(true);
            setIsQuery(false);

            dispatch({
                type: 'getTasks',
                listType: 'all'
            });
        }

        return () => {
            setIsLoading(false);
        }
    }, [state])

    const onChange = (active) => {
        if(view === active) {
            return false;
        }

        let listType = 'all'
        if(active === 'completed') {
            listType = 'completed';
        }

        setView(active);
        setIsLoading(true);

        dispatch({
            type: 'getTasks',
            listType: listType
        });
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
                            <Tabs
                                onChange={onChange}
                                activeView={view}
                                options={options}
                            />
                        </div>
                    </Col>
                    <Col sm={4} className={'text-right'}>
                        <Button color={'close'}
                                onClick={() => onCloseModalTasks()}
                        />
                    </Col>
                </Row>

                {
                    isQuery ? null :
                        <div>
                            {
                                isLoading ? <Loading type={'tasks'} /> :
                                    <div>
                                        {
                                            view === 'tasks' ? <ContainerTasksInWork tasks={state.tasks} /> :
                                                <TasksList list={state.tasks} />
                                        }
                                    </div>
                            }
                        </div>
                }
            </aside>
        )
    }
}