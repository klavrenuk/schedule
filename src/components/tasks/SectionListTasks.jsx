import React, {useEffect, useState} from 'react';

import Task from "./Task";
import NewTask from "./NewTask";

import './css/section_list_taks.min.css';

export default function SectionListTasks(props) {
    const [isShowCreateTask, setIsShowCreateTask] = useState(true);
    const [list, setList] = useState(props.list || []);
    const [isShowList, setIsShowList] = useState(true);

    useEffect(() => {
        setIsShowList(false);
        setList(props.list || []);

        setTimeout(() => {
            setIsShowList(true);
        }, 0);
    }, [props]);

    const toggleViewCreateTask = (value) => setIsShowCreateTask(value);

    return (
        <ul className={'section_list_tasks'}>
            {
                !isShowList ? null :
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