import React, {useState} from 'react';

import Task from "./Task";
import NewTask from "./NewTask";

import './css/section_list_taks.min.css';

export default function SectionListTasks(props) {
    const [isShowCreateTask, setIsShowCreateTask] = useState(false);

    const toggleViewCreateTask = (value) => setIsShowCreateTask(value);

    return (
        <ul className={'section_list_tasks'}>
            {
                props.list.map((task) => {
                    return <Task key={task._id} task={task} />
                })
            }

            {
                !isShowCreateTask ?
                    <NewTask toggleViewCreateTask={toggleViewCreateTask} />
                    :
                    <Task task={null} />
            }

        </ul>
    )
}