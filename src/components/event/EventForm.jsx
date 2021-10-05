import React from 'react';
import {Form} from "reactstrap";

import EventFormItem from './EventFormItem';

const options = [
    {
        type: 'name',
        label: 'Name'
    },
    {
        type: 'description',
        label: 'description'
    },
    {
        type: 'date',
        label: 'Date and time'
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