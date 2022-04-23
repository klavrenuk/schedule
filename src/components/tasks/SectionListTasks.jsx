import React, {useEffect, useState} from 'react';

import Task from "./Task";
import NewTask from "./NewTask";

import './css/section_list_taks.min.css';

export default function SectionListTasks(props) {
    const [isShowCreateTask, setIsShowCreateTask] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(props.list);

        return () => {
            setList([]);
        }
    }, [props]);

    const toggleViewCreateTask = (value) => setIsShowCreateTask(value);

    return (
        <ul className={'section_list_tasks'}>
            {
                list.map((task) => {
                    return <Task key={task._id}
                                 task={task}
                                 section={props.section}
                                 toggleViewCreateTask={toggleViewCreateTask}
                    />
                })

            }

            {
                isShowCreateTask ?
                    <NewTask toggleViewCreateTask={toggleViewCreateTask} />
                    :
                    <Task task={null}
                          toggleViewCreateTask={toggleViewCreateTask}
                          section={props.section}
                          isEdit={true}
                    />
            }

        </ul>
    )
}