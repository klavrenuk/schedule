import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Button} from "reactstrap";

import Tabs from './Tabs';
import TasksFooter from './TasksFooter';
import TasksList from "./TasksList";
import SectionNew from "./SectionNew";

import './css/tasks.min.css';

const options = ['tasks', 'completed'];

export default function Tasks() {
    const [view, setView] = useState('tasks');
    const [isShowSectionNew, setIsShowSectionNew] = useState(false);

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const onChange = (active) => {
        let listType = 'all'
        if(active === 'completed') {
            listType = 'completed';
        }

        dispatch({
            type: 'getTasks',
            listType: listType
        });

        setView(active);
    }

    const createSection = (value) => {
        closeSectionNew();
        dispatch({
            type: 'createSection',
            section: value
        });
    }

    const closeSectionNew = () => setIsShowSectionNew(false);

    const showSectionNew = () => {
        const taskListElem = document.querySelector('#TaskList');
        if(taskListElem) {
            taskListElem.scroll(0,0);
        }

        setIsShowSectionNew(true);
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
                    view === 'tasks' ?
                        <div>
                            {
                                isShowSectionNew ?
                                    <div className={'tasks-container'}>
                                        <SectionNew
                                            save={createSection}
                                            closeSectionNew={closeSectionNew}
                                        />
                                    </div>
                                    :
                                    null
                            }

                            <TasksList list={state.tasks} />
                            <TasksFooter showSectionNew={showSectionNew}/>
                        </div>
                        :
                        <TasksList list={state.tasks} />
                }
            </aside>
        )
    }
}