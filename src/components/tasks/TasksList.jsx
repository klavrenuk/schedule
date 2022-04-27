import React from 'react';

import Section from "./Section";

import './css/tasks_list.min.css';

export default function TasksList(props) {
    return (
        <div id="TaskList" className={'tasks_list custom_scrollbar'}>
            <div className={'tasks-container'}>
                <ul>
                    {
                        props.list.map((section) => {
                            return <Section key={section._id}
                                            data={section}
                            ></Section>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}