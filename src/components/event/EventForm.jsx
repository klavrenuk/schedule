import React from 'react';
import {Form} from "reactstrap";

import EventFormItem from './EventFormItem';

import './event_form.min.css';

const options = [
    {
        type: 'name',
        name: 'name',
        value: ''
    },
    {
        type: 'description',
        name: 'description',
        value: ''
    },
    {
        type: 'date',
        name: 'date',
        value: new Date()
    }
];

export default function EventForm() {
    return (
        <Form className={'event_form'}>
            {
                options.map((option) => {
                    return <EventFormItem key={option.type}
                                          data={option}
                    />
                })
            }
        </Form>
    )
}