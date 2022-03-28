import React from 'react';

import './css/tasks_list.min.css';
import Section from "./Section";

export default function TasksList(props) {
    return (
        <div className={'tasks_list'}>
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