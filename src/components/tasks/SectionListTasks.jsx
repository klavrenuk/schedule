import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import Task from "./Task";
import NewTask from "./NewTask";

import './css/section_list_taks.min.css';

export default function SectionListTasks(props) {
    const dispatch = useDispatch();
    const [isShowCreateTask, setIsShowCreateTask] = useState(true);
    const [list, setList] = useState(props.list || []);

    const toggleViewCreateTask = (value) => setIsShowCreateTask(value);

    const deleteTask = (task) => {
        dispatch({
            type: 'deleteTask',
            task: task
        });

        setList(list.filter((item) => {
            if(item._id !== task._id) {
                return item;
            }
        }));
    }

    const save = (task) => {
        if(task.hasOwnProperty('_id')) {
           dispatch({
               type: 'editTask',
               task: task
           });

        } else {
            dispatch({
                type: 'createTask',
                task: task
            });

            const arr = list;
            arr.push(task);
            setList(arr);

            setIsShowCreateTask(true);
        }
    }

    return (
        <ul className={'section_list_tasks'}>
            {
                list.map((task) => {
                    return <Task key={task._id}
                                 task={task}
                                 deleteTask={deleteTask}
                                 save={save}
                    />
                })
            }

            {
                isShowCreateTask ?
                    <NewTask toggleViewCreateTask={toggleViewCreateTask} />
                    :
                    <Task task={null}
                          toggleViewCreateTask={toggleViewCreateTask}
                          save={save}
                    />
            }

        </ul>
    )
}