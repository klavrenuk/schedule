import React, {useState, useImperativeHandle, forwardRef} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import {useSelector} from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2'

import Loading from "../general/Loading";
import EventFormItem from './EventFormItem';

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
            start: null,
            end: null
        }
    }
];

const ModalEvent = forwardRef((props, ref) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(optionsDefault);
    const [errorMessage, setErrorMessage] = useState(null);

    useImperativeHandle(ref, () => ({
        show() {
            setIsShowModal(true);
        }
    }))


    const showError = (message) => {
        setErrorMessage(message);
        setIsLoading(false);
    }

    const onSave = () => {
        setIsLoading(true);
        setErrorMessage(null);

        for(let option of options) {
            console.log('loop option', option);

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
        }

        axios({
            method: 'POST',
            url: '/api/event',
            data: {
                name: state.event.name,
                description: state.event.description || null,
                date: state.event.date
            }
        }).then(() => {
            setIsLoading(false);
            setTimeout(() => toggle(), 600);

        }).catch(() => {
            setErrorMessage('Saving error');
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
                <div className={'modal_event-error_message'}>{ errorMessage }</div>
            </ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={onSave}>save</Button>
            </ModalFooter>
        </Modal>
    )
});

export default ModalEvent;