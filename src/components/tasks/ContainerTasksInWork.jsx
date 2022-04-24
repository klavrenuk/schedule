import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import TasksFooter from './TasksFooter';
import TasksList from "./TasksList";
import SectionNew from "./SectionNew";

export default function ContainerTasksInWork(props) {
    const [isShowSectionNew, setIsShowSectionNew] = useState(false);

    const dispatch = useDispatch();
    const list = props.hasOwnProperty('tasks') ? props.tasks : [];

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

    return (
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

            <TasksList list={list} />
            <TasksFooter showSectionNew={showSectionNew}/>
        </div>
    )
}