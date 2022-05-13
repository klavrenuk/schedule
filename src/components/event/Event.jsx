import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react'
import axios from 'axios';
import {useDispatch} from "react-redux";

import EventModal from "./EventModal";
import EventPage from './EventPage';

const optionsDefault = [
    {
        name: 'name',
        value: ''
    },
    {
        name: 'description',
        value: ''
    },
    {
        name: 'date',
        value: {
            start: new Date(),
            end: new Date()
        }
    },
    {
        name: 'allDay',
        value: true
    }
];

const Event = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const RefEventModal = useRef();
    const RefEventPage = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [options, setOptions] = useState(JSON.parse(JSON.stringify(optionsDefault)));

    useImperativeHandle(ref, () => ({
        show() {
            setOptions(JSON.parse(JSON.stringify(optionsDefault)));
            setErrorMessage(null);
            dispatch( {
                type: 'event',
                option: 'isAllDay',
                value: true
            });

            if(props.type === 'page') {
                RefEventPage.current.show();
            } else {
                RefEventModal.current.show();
            }
        }
    }))


    const showError = (message) => {
        setErrorMessage(message);
        setIsLoading(false);
    }

    const onSave = () => {
        setIsLoading(true);
        setErrorMessage(null);

        const data = {};
        for(let option of options) {
            if(option.name === 'name') {
                if(!option.value || option.value.trim() === '') {
                    showError(`Please, fill option Name`);
                    return;
                }
            }

            if(option.name === 'date') {
                if(!option.value.start) {
                    showError(`Please, fill option Start Date`);
                    return;
                }

                if(!option.value.end) {
                    showError(`Please, fill option End Date`);
                    return;
                }
            }

            data[option.name] = option.value;
        }

        axios({
            method: 'POST',
            url: '/api/event',
            data: data
        }).then(() => {
            setIsLoading(false);
            setTimeout(() => toggle(), 600);

        }).catch(() => {
            showError('Saving error');
        })
    }


    return (
        <div>
            {
                props.type === 'modal' ?
                    <EventModal
                        ref={RefEventModal}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        options={options}
                        onSave={onSave}
                    />
                    :
                    <EventPage
                        ref={RefEventPage}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        options={options}
                        onSave={onSave}
                    />
            }
        </div>
    )
});

export default Event;