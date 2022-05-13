import React, {useState, useImperativeHandle, forwardRef} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import axios from 'axios';

import Loading from "../general/Loading";
import EventFormItem from './EventFormItem';
import ErrorMessageLine from "../general/ErrorMessageLine";
import {useDispatch} from "react-redux";

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

const ModalEvent = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [options, setOptions] = useState(JSON.parse(JSON.stringify(optionsDefault)));

    useImperativeHandle(ref, () => ({
        show() {
            setOptions(JSON.parse(JSON.stringify(optionsDefault)));

            dispatch( {
                type: 'event',
                option: 'isAllDay',
                value: true
            });

            setIsShowModal(true);
            setErrorMessage(null);
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

    const toggle = () => setIsShowModal(!isShowModal);

    return (
        <Modal className={'modal_event'}
               isOpen={isShowModal}
               toggle={toggle} size={'lg'}
        >
            {
                isLoading ?
                    <Loading type="modal" />
                    :
                    null
            }

            <ModalHeader toggle={toggle}>New event</ModalHeader>

            <ModalBody>
                <div>
                    {
                        options.map((option) => {
                            return <EventFormItem key={option.name}
                                                  data={option}
                            />
                        })
                    }
                </div>

                <ErrorMessageLine message={errorMessage} />
            </ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={onSave}>save</Button>
            </ModalFooter>
        </Modal>
    )
});

export default ModalEvent;